const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const {title, description, status} = req.body;
    const user = req.user._id;

    if (!title || !description || !status) {
        res.status(400).send({error: 'Data not valid'});
    }

    const taskData = {user, title, description, status};

    try {
        const task = new Task(taskData);
        await task.save();

        res.send({message: 'Task successfully saved', task});
    } catch (e) {
        res.sendStatus(500);
    }

});

router.get('/', auth, async (req, res) => {

    try {
        const tasks = await Task.find({user: req.user._id});

        res.send(tasks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.put('/:id', auth, async (req, res) => {
    const {title, description, status} = req.body;
    const user = req.user._id;

    const taskData = {user, title, description, status};

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({message: 'task not found!'});
        }
        const updateTask = await Task
          .findByIdAndUpdate(req.params.id, taskData, {new: true})
          .populate('user', 'username');

        res.send(updateTask);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id});
        res.send({message: 'task deleted'});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;