const express = require('express');
const { createEvent, getAllEvents, getSingleEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
