const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        //username min 3 chars
        if(!req.body.username || req.body.username.length < 3){
            //Statuscode für bad request (client-fehler)
            return res.status(400).send("Bitte gib einen Benutzernamen mit mindestens 3 Zeichen ein");
        }
        //password min 6 chars
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send("Bitte gib einen Passwort mit mindestens 6 Zeichen ein");
        }
        // password (repeat) must match
        if(!req.body.password_repeat || req.body.password_repeat != req.body.password){
            return res.status(400).send("Die Passwörter müssen übereinstimmenh");
        }
        next(); //Anfrage wird zur nächsten Middleware/Route weitergeleitet
    },
    isLoggedIn:(req, res, next) => {
        if(!req.headers.authorization){
            return res.status(400).send({
                message: 'Session not valid',
            });
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'SECRETKEY');
            req.userData = decoded;
            next();
        } catch(err) {
            throw err;
        }
    },
};