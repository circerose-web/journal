require("dotenv").config();
let router = require("express").Router();
let User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.post("/register",  (req, res) => {
    User.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 10),
    })
    .then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60*60*24});
    res.json ({
        user: user,
        message: "User successfully created",
        sessionToken: token
    });
    })
    .catch(err => res.status(500).json({
        error: err
    }))
});

router.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.user.username}})
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.passwordhash, user.passwordhash, (err, matches) => {
                if  (matches) {
                    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
                        expiresIn: 60*60*24,
                    });
                    res.status(200).json({
                        user: user,
                        message: 'User successfully logged in!!',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: 'Login failed'});
                }
            })
        } else {
            res.status(500).send({ error: err})
        }
    })
    .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;


