import express from 'express';
import { getEvents, addEvent, deleteEvent, getEventBySearch, updateEvent } from '../controller/events.js'

const router = express.Router();

router.get('/search', getEventBySearch);

router.get('/', getEvents);
router.post('/', addEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);


export default router;