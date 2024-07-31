const express = require('express');
const router = express.Router();
const { createTask, getTasksByUser } = require('../controllers/taskController');

router.post('/', createTask);
router.get('/user/:userid', getTasksByUser);

module.exports = router;
