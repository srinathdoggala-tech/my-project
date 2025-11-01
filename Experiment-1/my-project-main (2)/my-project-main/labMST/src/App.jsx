import { useState } from 'react'
import Events from './components/Events'
import EventForm from './components/EventForm'
import './App.css'

function App() {
  const [events, setEvents] = useState([
    {
      id:1,
      name: "Project Meeting",
      date: '2020-02-30'
    }
  ])

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent])
  }

  return (
    <div>
      <h1>Events Calendar Application</h1>
      
      <div>
        <EventForm onAddEvent={handleAddEvent} />
      </div>
      
      <div>
        <Events events={events} />
      </div>
    </div>
  )
}

export default App
