// File: backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getTasksByUser, getAllTasks, getSingleTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/user/:userid', getTasksByUser);
router.get('/', getAllTasks);
router.get('/:id', getSingleTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
