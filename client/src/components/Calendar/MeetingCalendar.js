import React, {useEffect, useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "./MeetingCaldndar.css";

import CalendarModal from "./CalendarModal";

Modal.setAppElement('#root');
const { DateTime } = require("luxon");

const locales = {
    "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: false,
        start: new Date(2022, 8, 3, 5, 6),
        end: new Date(2022, 8, 3, 7, 8),
        id: "d"
    },
    {
        title: "Vacation",
        start: new Date(2022, 8, 30),
        end: new Date(2022, 8, 30)
    },
    {
        title: "Conference",
        start: new Date(2022, 8, 20),
        end: new Date(2022, 8, 23)
    },
];


const MeetingCalendar = () => {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [addedEvent, setAddedEvent] = useState({ title: "", start: "", end: "" });
    const [search, setSearch] = useState('');
    const [allEvents, setAllEvents] = useState([]);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        RenderCalendar();
    }, [allEvents]);

    const getEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/events`);
           // console.log(response.data);
            response.data.map((event) => {
                event.start = new Date(event.start)
                event.end = new Date(event.end)
            })
            setAllEvents(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);


    const handleAddEvent = async (e) => {
        e.preventDefault();
        //  console.log("event", addedEvent);
        setAllEvents([...allEvents, addedEvent]);
        // console.log(allEvents);
        try {
            const newData = await axios.post( 'http://localhost:5000/events', addedEvent);
            setAddedEvent({
                title: "", end: "", start: ""
            });
            notifySuccess();
        } catch (error) {
            notifyFailure();
            console.log(error);
        }
    }

    const handleEventSelection = (e) => {
        console.log(e, "Event data");
        setNewEvent(e);
        openModal();
        setCurrentId(e._id);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const getEventBySearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/events/search?title=${search || 'none'}`);
                // console.log(response.data);
                const { data } = response.data;
                data.map((event) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                })
                setAllEvents(data);
            } catch (err) {
                console.log(err);
            }
        };
        getEventBySearch();
    }

    const notifySuccess = () => toast("New Event added successfully! ");
    const notifyFailure = () => toast.error("Error Occurred...");

    const clean = (e) => {
        e.preventDefault();
        setAddedEvent({
            title: "", end: "", start: ""
        });
    }

    const RenderCalendar = () => {
        return (
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventSelection}
                style={{
                    height: 500,
                    margin: "50px"
                }} />
        );
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const deleteEvent = async (id) => {
            try {
                const response = await axios.delete(`http://localhost:5000/events/${id}`);
                getEvents();
                toast("Event deleted successfully! ");
                closeModal();
            } catch (err) {
                console.log(err);
            }
        }
        deleteEvent(currentId);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateEvent = async (id, event) => {
            try {
                const response = await axios.patch(`http://localhost:5000/events/${id}`, event);
                getEvents();
                toast("Event updated successfully! ");
                closeModal();
            } catch (err) {
                console.log(err);
            }
        }
        updateEvent(currentId, newEvent);
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {

    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="Calendar-App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <form>
                    <input type="text"
                           placeholder="Add Title"
                           style={{ width: "20%", marginRight: "auto" }}
                           value={addedEvent.title}
                           onChange={(e) => setAddedEvent({ ...addedEvent, title: e.target.value })} />
                    <DatePicker
                        placeholderText="Start Date"
                        selected={addedEvent.start}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={(start) => {
                            setAddedEvent({ ...addedEvent, start })
                            console.log(start)
                        }}
                        popperPlacement="auto"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [5, 10],
                                },
                            },
                            {
                                name: "preventOverflow",
                                options: {
                                    rootBoundary: "viewport",
                                    tether: false,
                                    altAxis: true,
                                },
                            },
                        ]}
                    />
                    <DatePicker
                        placeholderText="End Date"
                        selected={addedEvent.end}
                        showTimeSelect
                        timeFormat="HH:mm"
                        popperClassName="Datepicker"
                        timeIntervals={15}
                        onChange={(end) => setAddedEvent({ ...addedEvent, end })}
                        popperPlacement="auto"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [5, 10],
                                },
                            },
                            {
                                name: "preventOverflow",
                                options: {
                                    rootBoundary: "viewport",
                                    tether: false,
                                    altAxis: true,
                                },
                            },
                        ]}
                    />
                    <button onClick={handleAddEvent} stlye={{ marginTop: "10px" }}>
                        Submit
                    </button>
                    <button onClick={clean}> Clean</button>
                </form>
            </div>
                <form onSubmit={handleSearch}>
                    <input
                        placeholder="Search an Event"
                        style={{ width: "20%", marginRight: "auto" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                        <button> Search </button>
                </form>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventSelection}
                style={{
                    height: 500,
                    margin: "50px"
                }} />
            <ToastContainer />
            <CalendarModal modalIsOpen={modalIsOpen}
                           afterOpenModal={afterOpenModal}
                           closeModal={closeModal}
                           newEvent={newEvent}
                           setNewEvent={setNewEvent}
                           handleDelete={handleDelete}
                           handleUpdate={handleUpdate}
                           currentId={currentId}
            />
        </div>
    );
};

export default MeetingCalendar;