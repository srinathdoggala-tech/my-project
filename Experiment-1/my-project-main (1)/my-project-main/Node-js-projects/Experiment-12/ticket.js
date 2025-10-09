const express = require('express');
const app = express();
const port = 3000;

app.set('json spaces', 2);
app.use(express.json());

const LOCK_TIMEOUT = 60 * 1000;

const seats = {
  '1': { status: 'available' },
  '2': { status: 'available' },
  '3': { status: 'available' },
  '4': { status: 'available' },
  '5': { status: 'available' },
  '6': { status: 'available' },
  '7': { status: 'available' },
  '8': { status: 'available' },
};

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🎟️ Ticket Booking API is running. Use /seats, /lock/:seatId, /confirm/:seatId');
});

app.get('/seats', (req, res) => {
  res.json(seats);
});

app.post('/lock/:seatId', (req, res) => {
  const { seatId } = req.params;

  if (!seats[seatId]) {
    return res.status(404).json({ message: 'Seat not found' });
  }

  const seat = seats[seatId];
  const now = Date.now();

  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat is already booked' });
  }

  if (seat.status === 'locked' && (now - seat.lockTimestamp < LOCK_TIMEOUT)) {
    return res.status(400).json({ message: 'Seat is currently locked by another user' });
  }

  seat.status = 'locked';
  seat.lockTimestamp = now;
  console.log(`Seat ${seatId} locked at ${now}`);

  setTimeout(() => {
    if (seats[seatId].status === 'locked' && seats[seatId].lockTimestamp === now) {
      seats[seatId].status = 'available';
      delete seats[seatId].lockTimestamp;
      console.log(`Lock for seat ${seatId} expired. Seat is now available.`);
    }
  }, LOCK_TIMEOUT);

  res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
});

app.post('/confirm/:seatId', (req, res) => {
  const { seatId } = req.params;

  if (!seats[seatId]) {
    return res.status(404).json({ message: 'Seat not found' });
  }

  const seat = seats[seatId];
  const now = Date.now();

  if (seat.status !== 'locked') {
    return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });
  }

  if (now - seat.lockTimestamp > LOCK_TIMEOUT) {
    seat.status = 'available';
    delete seat.lockTimestamp;
    return res.status(400).json({ message: 'Lock has expired. Please try locking the seat again.' });
  }

  seat.status = 'booked';
  delete seat.lockTimestamp;

  res.json({ message: `Seat ${seatId} booked successfully!` });
});

app.listen(port, () => {
  console.log(`🎟️ Ticket booking server is running at http://localhost:${port}`);
});
