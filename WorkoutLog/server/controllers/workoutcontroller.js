const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const user = require('../models/user');
const Log = require('../db').import('../models/workout_logs');

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a practice route!')
});

router.post('/create', validateSession, (req, res) => {
    const Log = {
        title: req.body.workoutEntry.title,
        date: req.body.workoutEntry.date,
        entry: req.body.workoutEntry.entry,
        owner: req.user.id
    }
    Log.create(LogEntry)
        .then(Log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))    
});

router.get("/", (req, res) => {
    Log.findAll()
    .then(workoutLog => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
});

router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner: userid }
    })
    .then(woLog => res.status(200).json(Log))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/:title', function (req, res){
    let title = req.params.title;

    Log.findAll({
        where: { title, title }
    })
    .then(Log => res.status(200).json(Log))
    .catch(err => res.status(500).json({ error, err }))
});

router.put("/:id", validateSession, function (req, res) {
    const updateLog= {
        title: req.body.log.title,
        date: req.body.log.date,
        entry: req.body.log.entry,
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id }};

    Log.update(updateLog, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Workout entry removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;