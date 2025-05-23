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

      // Fragen aus der DB holen
      try {
        // Hier verwenden wir queryAsync anstelle von db.query direkt
        const results = await queryAsync('SELECT * FROM questions WHERE category = ?', [category]);
        console.log('Fragen aus der DB:', results);
        if (results.length < 2) {
          return io.to(lobbyId).emit('error', { message: 'Nicht genug Fragen in dieser Kategorie' });
        }
    
        // Annahme: `results` enthält alle Fragen der Datenbank
        const half = Math.floor(results.length / 2);
    
        // Teilen der Fragen in zwei Hälften (erste Hälfte und zweite Hälfte)
        const firstHalfQuestions = results.slice(0, half);
        const secondHalfQuestions = results.slice(half);
    
        // Fragen den Spielern zuweisen
        const player1 = lobby.players[0];
        const player2 = lobby.players[1];
    
        // Fragen für beide Spieler (mehr als eine Frage zuweisen)
        lobbies[lobbyId].questions = {
          [player1]: firstHalfQuestions,
          [player2]: secondHalfQuestions
        };
    
        // Fragen an beide Spieler senden
        io.to(player1).emit('newQuestion', {
          question: firstHalfQuestions[0].question,
          options: JSON.parse(firstHalfQuestions[0].options),
          correct: firstHalfQuestions[0].answer
        });
    
        io.to(player2).emit('newQuestion', {
          question: secondHalfQuestions[0].question,
          options: JSON.parse(secondHalfQuestions[0].options),
          correct: secondHalfQuestions[0].answer
        });
    
        // Start-Index für jeden Spieler speichern
        lobbies[lobbyId].currentQuestionIndex = {
          [player1]: 0, // Index der aktuellen Frage für Spieler 1
          [player2]: 0  // Index der aktuellen Frage für Spieler 2
        };
        console.log('Fragen zugewiesen:', firstHalfQuestions);
      } catch (err) {
        console.error('Fehler beim Abrufen der Fragen:', err);
        return io.to(lobbyId).emit('error', { message: 'Fehler beim Abrufen der Fragen' });
      }
    }
    socket.on("sendQuestionToTeammate", ({ lobbyId, question }) => {
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
    });
    // Abrufen der nächsten Frage
    const requestNextQuestion = (socket, lobbyId) => {
      const lobby = lobbies[lobbyId];
      if (!lobby) return;

      const playerQuestions = lobby.questions[socket.id];
      const currentQuestionIndex = lobby.currentQuestionIndex[socket.id];

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < playerQuestions.length) {
        lobby.currentQuestionIndex[socket.id] = nextQuestionIndex;
        const nextQuestion = playerQuestions[nextQuestionIndex];

        socket.emit("newQuestion", {
          question: nextQuestion.question,
          options: JSON.parse(nextQuestion.options),
          correct: nextQuestion.answer
        });
      } else {
        console.log(`Spieler ${socket.id} hat keine weiteren Fragen.`);
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
      console.log('Richtige Antwort:', correctAnswer); // Diese Zeile sollte jetzt die richtige Antwort zeigen
      const correct = answer === correctAnswer;


      // Score aktualisieren
      if (correct) {
        lobbies[lobbyId].scores[socket.id] += 1;
      }

      // Feedback senden
      socket.emit('answerFeedback', { message: correct ? 'Richtig!' : 'Falsch!', correct });

      if(lobby.forwardedQuestions[socket.id]){
        console.log(`DEBUG: Spieler ${socket.id} beantwortet eine weitergeleitete Frage.`);
        delete lobby.forwardedQuestions[socket.id]; // Entfernen, da sie beantwortet wurde
      } else{
        // Nächste Frage für den Spieler senden
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < playerQuestions.length) {
        // Nächste Frage für diesen Spieler
        lobby.currentQuestionIndex[socket.id] = nextQuestionIndex;
        const nextQuestion = playerQuestions[nextQuestionIndex];
        io.to(socket.id).emit('newQuestion', {
          question: nextQuestion.question,
          options: JSON.parse(nextQuestion.options),
          correct: nextQuestion.answer
        });
      } else {
        // Alle Fragen für den Spieler beantwortet -> prüfen, ob alle Spieler fertig sind
        const allPlayersAnswered = lobby.players.every(playerId => {
          const playerCurrentIndex = lobby.currentQuestionIndex[playerId] + 1;
          const totalQuestions = lobby.questions[playerId]?.length || 0;
          console.log(`Spieler ${playerId} hat Fragen bis Index ${playerCurrentIndex} beantwortet. Total Fragen: ${totalQuestions}`);
          // Hier haben wir das Problem gefixt: Spieler hat alle Fragen beantwortet, wenn der currentIndex >= totalQuestions
          return playerCurrentIndex >= totalQuestions; // Spieler hat alle Fragen beantwortet
        });

        console.log("allPlayersAnswered:", allPlayersAnswered);

        // Wenn alle Spieler fertig sind, beenden wir das Spiel
        if (allPlayersAnswered) {
          const teamScore = Object.values(lobby.scores).reduce((acc, score) => acc + score, 0);
          // Spiel beenden
          io.to(lobbyId).emit('gameOver', { 
            message: 'Das Spiel ist vorbei!',
            scores: lobby.scores,
            teamScore: teamScore
          });
          console.log('Spiel beendet:', lobby.scores);
          console.log(`Gesamtpunktzahl des Teams: ${teamScore}`);
        }
          
      }
      }
      
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
