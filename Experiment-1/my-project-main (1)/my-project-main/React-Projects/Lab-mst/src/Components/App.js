import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";

function App() {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  const fetchEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add new event
  const addEvent = async (event) => {
    await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    fetchEvents();
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h1>📅 Events Calendar</h1>
      <EventForm onAdd={addEvent} />
      <EventList events={events} />
    </div>
  );
}

export default App;
