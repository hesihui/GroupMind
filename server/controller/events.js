import CalendarDetail from "../model/calendarDetail.js";
import mongoose from "mongoose";

// get all the events
export const getEvents = async (req, res) => {
    try {
        const calendarDetail = await CalendarDetail.find();
        res.status(200).json(calendarDetail);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// add new event
export const addEvent = async (req, res) => {
    const event = req.body;

    const newEvent = new CalendarDetail({ ...event });

    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// delete an event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Event with id: ${id}`);

    await CalendarDetail.findByIdAndRemove(id);
    res.json({ message: "Candidate Info has been deleted successfully." });
}

export const updateEvent = async (req, res) => {
    // id: _id  rename the param id to be _id
    const { id } = req.params;
    const { title, start, end } = req.body;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Event with id: ${id}`);

    // Note: mongoDB default id key is '_id',
    // so when we update the post, we need to map id to '_id'
    const updatedEvent = { title, start, end, _id: id };

    await CalendarDetail.findByIdAndUpdate(id, updatedEvent, { new: true });

    res.json(updatedEvent);
}

export const getEventBySearch = async (req, res) => {
    const { title } = req.query;

    try {
        const events = await CalendarDetail.find({
             "title": {
                 "$regex": title,
                 "$options": "i"
             }
        })
        res.json({ data: events });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
