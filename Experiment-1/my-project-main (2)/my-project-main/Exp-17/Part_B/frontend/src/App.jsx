import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  // const [socketId, setSocketId] = useState(socket.id);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("🟢 Connected to server with ID:", socket.id);
    //   setSocketId(socket.id);
    // });

    // socket.on("disconnect", () => {
    //   console.log("🔴 Disconnected from server");
    // });

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    
    // return () => {
    //   socket.off("connect");
    //   socket.off("disconnect");
    // };

  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const msgData = { name, message };
    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div style={{border:"2px solid black", width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>💬 Real-Time Chat App: </h2>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <form onSubmit={sendMessage}>
        <input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div style={{border:"2px solid black", marginTop: "20px", textAlign: "left" }}>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;