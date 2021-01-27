const jwt = require('jsonwebtoken');
let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Log = sequelize.import('../models/log');
let validateSession = require("../middleware/validate-session");

router.post("/create", (req, res) => {
    Log.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req. body.result,
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.owner_id
    })
    .then(log => res.status(200).json({log}))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/", (req, res) => {
    Log.findAll()
    .then((log) => res.status(200).json({log}))
    .catch(err => res.status(500).json({error: err}))
})

router.delete("/:id", function (req, res) {
    const query = { where: {id: req.params.id, owner_id: req.user.id}}
})
    router.put("/:id", function (req, res) {
        const updateLog = {
        description: req.body.description,
        definition: req.body.definition,
        result: req. body.result,
        }
        const query = {where: {id: req.params.id}}

        Log.update(updateLoq, query)
            .then((log) => res.status(200).json(log))
            .catch((err) => res.status(500).json({error: err}));
    });

    module.exports = router;
        
