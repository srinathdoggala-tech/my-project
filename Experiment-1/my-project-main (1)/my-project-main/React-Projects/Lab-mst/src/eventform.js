import React, { useState } from "react";

function EventForm({ onAdd }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) return;
    onAdd({ name, date });
    setName("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Add Event</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { padding: "8px", fontSize: "16px" },
  button: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EventForm;
