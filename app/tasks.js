const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const {title,description,status} = req.body;
    const user = req.user._id;

    if (!title || !description || !status) {
        res.status(400).send({error: 'Data not valid'});
    }

    const taskData = {user,title,description, status};
    const task = new Task(taskData);
    await task.save();

    res.send({message:'Task successfully saved',task});
});


module.exports = router;