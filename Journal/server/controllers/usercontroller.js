const { Router } = require('express');

const router = require('express').Router();
const User = require('../db').import('../models/user');


router.post('/create', function (req, res) {

    User.create({
        email: "user@email.com",
        password
    }
    })
})
module.exports = router;

