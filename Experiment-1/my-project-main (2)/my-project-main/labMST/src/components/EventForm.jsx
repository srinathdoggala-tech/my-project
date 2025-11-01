import React, { useState } from "react";

const EventForm = ({ onAddEvent }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName.trim() || !eventDate) {
      alert("Please fill in all fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName.trim(),
      date: eventDate,
    };

    onAddEvent(newEvent);

    setEventName("");
    setEventDate("");
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
            />
          </label>
        </div>

        <div>
          <label>
            Event Date:
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
