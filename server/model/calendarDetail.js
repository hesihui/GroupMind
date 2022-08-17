import mongoose from 'mongoose';

const calendarSchema = mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
});

const CalendarDetail = mongoose.model('CalendarDetail', calendarSchema);

export default CalendarDetail;