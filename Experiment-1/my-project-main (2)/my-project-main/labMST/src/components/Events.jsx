import React from "react";

const Events = ({ events }) => {
  return (
    <div>
      <h2>Events Calendar</h2>
      <div>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>ID: {event.id}</p>
            <p>Date: {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
