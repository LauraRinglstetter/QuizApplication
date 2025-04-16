const { all } = require('./routes/router.js');

module.exports = (io) => {
  const lobbies = {};
  const db = require('./lib/db.js');

  io.on('connection', (socket) => {
    console.log('Neuer Spieler verbunden:', socket.id);

    // Spieler tritt automatisch einer freien Lobby bei
    socket.on('joinLobby', (data) => {
      const category = data.category;
      console.log('Kategorie erhalten:', category);

      let lobbyId = Object.keys(lobbies).find(id => lobbies[id].players.length < 2);

      if (!lobbyId) {
        lobbyId = 'lobby_' + Math.floor(Math.random() * 1000);
        lobbies[lobbyId] = { 
          id: lobbyId, 
          players: [], 
          scores: {}, 
          currentQuestionIndex: { [socket.id]: 0 }, 
          category: category, 
          questions: {},
          forwardedQuestions: {} // Hier werden die weitergeleiteten Fragen gespeichert
        };
      }

      lobbies[lobbyId].players.push(socket.id);
      lobbies[lobbyId].scores[socket.id] = 0;
      socket.join(lobbyId);
      io.to(lobbyId).emit('lobbyUpdate', lobbies[lobbyId]);

      if (lobbies[lobbyId].players.length === 2) {
        io.to(lobbyId).emit('startQuiz');
        // Fragen aus der Datenbank für beide Spieler laden
        const category = lobbies[lobbyId].category;
        sendQuestions(io, lobbyId, category);
      }
    });

    // Funktion zum Abrufen der Fragen aus der Datenbank und Zuweisung an die Spieler
    async function sendQuestions(io, lobbyId, category) {
      const lobby = lobbies[lobbyId];
      if (!lobby) return;
    
      try {
        const [results] = await db.query('SELECT * FROM questions WHERE category = ?', [category]);
    
        if (results.length < 2) {
          return io.to(lobbyId).emit('error', { message: 'Nicht genug Fragen in dieser Kategorie' });
        }
    
        const half = Math.floor(results.length / 2);
        const firstHalfQuestions = results.slice(0, half);
        const secondHalfQuestions = results.slice(half);
    
        const player1 = lobby.players[0];
        const player2 = lobby.players[1];
    
        lobbies[lobbyId].questions = {
          [player1]: firstHalfQuestions,
          [player2]: secondHalfQuestions
        };
    
        let options1, options2;
    
        try {
          options1 = JSON.parse(firstHalfQuestions[0].options);
          options2 = JSON.parse(secondHalfQuestions[0].options);
        } catch (parseErr) {
          console.error('Fehler beim Parsen der Antwortoptionen:', parseErr);
          console.error('Options 1:', firstHalfQuestions[0].options);
          console.error('Options 2:', secondHalfQuestions[0].options);
    
          return io.to(lobbyId).emit('error', { message: 'Ungültige Daten im Fragenformat (options nicht gültiges JSON)' });
        }
    
        io.to(player1).emit('newQuestion', {
          question: firstHalfQuestions[0].question,
          options: options1,
          correct: firstHalfQuestions[0].answer
        });
    
        io.to(player2).emit('newQuestion', {
          question: secondHalfQuestions[0].question,
          options: options2,
          correct: secondHalfQuestions[0].answer
        });
    
        lobbies[lobbyId].currentQuestionIndex = {
          [player1]: 0,
          [player2]: 0
        };
    
        console.log('Fragen zugewiesen:', {
          [player1]: firstHalfQuestions[0].question,
          [player2]: secondHalfQuestions[0].question
        });
    
      } catch (err) {
        console.error('Fehler beim Abrufen der Fragen:', err);
        return io.to(lobbyId).emit('error', { message: 'Fehler beim Abrufen der Fragen' });
      }
    }
    /*socket.on("sendQuestionToTeammate", ({ lobbyId, question }) => {
      const lobby = lobbies[lobbyId];
      if (!lobby) return;
    
      // Empfänger ist der andere Spieler in der Lobby
      const recipientId = lobby.players.find(playerId => playerId !== socket.id);
      
      if (recipientId) {
        io.to(recipientId).emit("receiveQuestionFromTeammate", question);
        console.log(`Frage an Spieler ${recipientId} gesendet:`, question);
        // Hier wird nur der Index des Spielers erhöht, nicht sofort das GameOver ausgelöst
        //const nextQuestionIndex = lobby.currentQuestionIndex[socket.id] + 1;
        //lobby.currentQuestionIndex[socket.id] = nextQuestionIndex;
        lobby.forwardedQuestions[recipientId] = true;

        console.log(`DEBUG: Spieler ${recipientId} hat eine weitergeleitete Frage erhalten.`);

        requestNextQuestion(socket, lobbyId);
        // Erst die Frage senden, aber den Index nicht sofort erhöhen
        console.log(`Frage wurde an Spieler ${recipientId} gesendet, warte auf Antwort.`);

      }
    });*/

    socket.on("requestNextQuestion", (lobbyId) => {
      requestNextQuestion(socket, lobbyId);
    });
    // Abrufen der nächsten Frage
    const requestNextQuestion = (socket, lobbyId) => {
      const lobby = lobbies[lobbyId];
      if (!lobby) return;

      const playerQuestions = lobby.questions[socket.id];
      const currentQuestionIndex = lobby.currentQuestionIndex[socket.id];
      const nextQuestionIndex = currentQuestionIndex + 1;

      console.log(nextQuestionIndex);

      if (nextQuestionIndex < playerQuestions.length) {
        lobby.currentQuestionIndex[socket.id] = nextQuestionIndex;
        const nextQuestion = playerQuestions[nextQuestionIndex];

        io.to(socket.id).emit('newQuestion', {
          question: nextQuestion.question,
          options: JSON.parse(nextQuestion.options),
          correct: nextQuestion.answer
        }); 
      } else {
        // Spieler ist fertig -> speichern
        lobby.currentQuestionIndex[socket.id] = nextQuestionIndex;

        // Info an Spieler: du bist fertig
        io.to(socket.id).emit('playerFinished', { 
          message: 'Warte bis dein Mitspieler alle Fragen beantwortet hat',
        });    
      }
      //Prüfung nach jeder Antwort – sind alle fertig?
      const allPlayersAnswered = lobby.players.every(playerId => {
        const totalQuestions = lobby.questions[playerId]?.length || 0;
        const playerProgress = lobby.currentQuestionIndex[playerId];
        return playerProgress >= totalQuestions;
      });
      // Wenn alle Spieler fertig sind, beenden wir das Spiel
      if (allPlayersAnswered) {
        const teamScore = Object.values(lobby.scores).reduce((acc, score) => acc + score, 0);
        // Spiel beenden
        const answeredQuestions = lobby.answeredQuestions || {};
        io.to(lobbyId).emit('gameOver', { 
          message: 'Das Spiel ist vorbei!',
          scores: lobby.scores,
          teamScore: teamScore,
          answeredQuestions: answeredQuestions,
        });
        console.log('Spiel beendet:', lobby.scores);
        console.log(`Gesamtpunktzahl des Teams: ${teamScore}`);
      }
    };

    // Spieler antwortet auf eine Frage
    socket.on('answerQuestion', (data) => {
      const { lobbyId, answer } = data;
      console.log(`Spieler ${socket.id} hat geantwortet:`, answer);

      const lobby = lobbies[lobbyId];
      if (!lobby) return;

      const playerQuestions = lobby.questions[socket.id];
      const currentQuestionIndex = lobby.currentQuestionIndex[socket.id];

      // Überprüfen, ob der Index gültig ist
      if (currentQuestionIndex >= playerQuestions.length) {
        console.error(`Der Index ${currentQuestionIndex} ist außerhalb der Fragenliste für Spieler ${socket.id}.`);
        return; // Verhindern, dass wir auf eine nicht existierende Frage zugreifen
      }
      const correctAnswer = playerQuestions[currentQuestionIndex].answer; // Die richtige Antwort
      console.log(playerQuestions[currentQuestionIndex]);
      console.log('Richtige Antwort:', correctAnswer); 
      const correct = answer === correctAnswer;

      // Speichern der beantworteten Fragen
      if (!lobby.answeredQuestions) {
        lobby.answeredQuestions = {};  // Initialisiere das answeredQuestions Objekt, wenn noch nicht vorhanden
      }
      if (!lobby.answeredQuestions[socket.id]) {
        lobby.answeredQuestions[socket.id] = [];  // Initialisiere das Array für den Spieler, falls noch nicht vorhanden
      }

      // Füge die Frage und die Antwort des Spielers hinzu
      lobby.answeredQuestions[socket.id].push({
        question: playerQuestions[currentQuestionIndex].question,
        options: JSON.parse(playerQuestions[currentQuestionIndex].options),
        correct: correctAnswer,
        selected: answer,  // Die Antwort des Spielers
      });
      // Score aktualisieren 
      if (correct) {
        lobbies[lobbyId].scores[socket.id] += 1;
      }

      // Feedback senden
      socket.emit('answerFeedback', { message: correct ? 'Richtig!' : 'Falsch!', correct });
      
    });


    socket.on('disconnect', () => {
      console.log(`Spieler ${socket.id} hat das Spiel verlassen`);
      Object.keys(lobbies).forEach((lobbyId) => {
        if (lobbies[lobbyId].players.includes(socket.id)) {
          lobbies[lobbyId].players = lobbies[lobbyId].players.filter(p => p !== socket.id);
          if (lobbies[lobbyId].players.length === 0) {
            delete lobbies[lobbyId];
          }
        }
      });
    });
  });
};
