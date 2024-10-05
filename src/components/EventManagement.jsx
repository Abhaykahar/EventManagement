import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    image: null
  });
  const [rsvpStatus, setRsvpStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to access events');
      navigate('/login');
    } else {
      // Load events from localStorage
      const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
      setEvents(savedEvents);
    }
  }, [navigate]);

  // Handle event creation
  const handleCreateEvent = (e) => {
    e.preventDefault();
    
    const eventId = events.length + 1;
    const eventWithId = { ...newEvent, id: eventId, attendees: [] }; 
    const updatedEvents = [...events, eventWithId];
    
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setNewEvent({ title: '', description: '', date: '', location: '', maxAttendees: '', image: null });
    toast.success('Event created successfully!');
  };

  // Handle RSVP
  const handleRsvp = (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to RSVP');
      navigate('/login');
      return;
    }

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        if (event.attendees.length < event.maxAttendees) {
          event.attendees.push('currentUser'); // Replace 'currentUser' with actual user info
          setRsvpStatus({ ...rsvpStatus, [eventId]: true });
          toast.success('RSVP successful');
        } else {
          toast.error('Event is full');
        }
      }
      return event;
    });

    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.info('Event deleted successfully');
  };

  // Handle event editing
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(event => event.id === eventId);
    setNewEvent(eventToEdit);
    handleDeleteEvent(eventId); 
  };

  return (
    <div className="container mt-5">
      <ToastContainer autoClose={1000} />
      <h4 className='mb-3'>Create New Event</h4>


      {/* Create Event Form */}
      <div className="col-lg-8 mx-auto border border-dark p-3">
      <form onSubmit={handleCreateEvent} className="mt-4">
        <div className="form-group mb-3">
          <label className='mb-1'>Event Title</label>
          <input
            type="text"
            className="form-control"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Description</label>
          <textarea
            className="form-control"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Date</label>
          <input
            type="date"
            className="form-control"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Location</label>
          <input
            type="text"
            className="form-control"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Max Attendees</label>
          <input
            type="number"
            className="form-control"
            value={newEvent.maxAttendees}
            onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Image Upload</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })}
          />
        </div>
        <button type="submit" className="btn btn-dark mt-3">Create Event</button>
      </form>
      </div>

      {/* Display List of Events */}
      <h4 className="mt-5">Upcoming Events</h4>
      <div className="row mt-3">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <strong>Date:</strong> {event.date} <br />
                    <strong>Location:</strong> {event.location} <br />
                    <strong>Max Attendees:</strong> {event.maxAttendees} <br />
                    <strong>Current Attendees:</strong> {event.attendees.length}
                  </p>
                  <button className="btn btn-dark me-2" onClick={() => handleRsvp(event.id)}>
                    {rsvpStatus[event.id] ? 'RSVPed' : 'RSVP'}
                  </button>
                  <button className="btn btn-dark ml-2 me-2" onClick={() => handleEditEvent(event.id)}>
                    Edit
                  </button>
                  <button className="btn btn-dark ml-2" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventManagement;
