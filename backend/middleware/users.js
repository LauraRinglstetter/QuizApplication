const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        //username min 3 chars
        if(!req.body.username || req.body.username.length < 3){
            //Statuscode für bad request (client-fehler)
            return res.status(400).send({
                message: "Please enter a username with min. 3 chars",
            });
        }
        //password min 6 chars
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message: "Please enter a password with min. 6 chars",
            });
        }
        // password (repeat) must match
        if(!req.body.password_repeat || req.body.password_repeat != req.body.password){
            return res.status(400).send({
                message: "Both passwords must match",
            });
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