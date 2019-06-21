const pool = require('../db.config.js')
const bcrypt = require('bcrypt');

class AuthController {
    signup(req, res, next) {
        let { username, password, email } =  req.body;
        email = email.toLowerCase();
        username = username.toLowerCase();

        pool.query(`SELECT * FROM stock_app.user WHERE email="${email}" OR username="${username}";`, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                res.status(422).json({ error: true, message: "cannot create user" });
            }
            else {
                bcrypt.hash(password, bcrypt.genSaltSync(10)).then(hashedPw => {
                    pool.query(`INSERT INTO stock_app.user SET email="${email}", username="${username}", password="${hashedPw}", dateCreated=NOW();`, (err, rows, fields) => {
                        if (err) throw err;
                        res.status(201).json({ message: "user created"})
                    })
                })
            }
        })
    }
}

module.exports = new AuthController();