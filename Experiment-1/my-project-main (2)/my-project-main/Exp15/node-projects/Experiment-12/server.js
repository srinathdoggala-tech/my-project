const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const LOCK_DURATION_MS = 60 * 1000;

const seats = {};
const NUM_SEATS = 10;
for (let i = 1; i <= NUM_SEATS; i++) {
    seats[String(i)] = {
        status: 'available',
        lockOwner: null,
        lockExpiresAt: null,
        lockTimer: null
    };
}

function clearLock(seatId) {
    const s = seats[seatId];
    if (!s) return;
    if (s.lockTimer) {
        clearTimeout(s.lockTimer);
        s.lockTimer = null;
    }
    s.lockOwner = null;
    s.lockExpiresAt = null;
    if (s.status === 'locked') s.status = 'available';
}

app.get('/seats', (req, res) => {
    const out = {};
    for (const id of Object.keys(seats)) {
        const { status, lockOwner, lockExpiresAt } = seats[id];
        out[id] = {
            status,
            lockOwner,
            lockExpiresAt: lockExpiresAt ? new Date(lockExpiresAt).toISOString() : null
        };
    }
    res.json(out);
});

app.post('/lock/:id', (req, res) => {
    const id = String(req.params.id);
    const owner = req.body && req.body.owner ? String(req.body.owner) : `owner-${Math.random().toString(36).slice(2, 8)}`;
    const s = seats[id];

    if (!s) return res.status(404).json({ message: `Seat ${id} does not exist.` });
    if (s.status === 'booked') return res.status(400).json({ message: `Seat ${id} is already booked.` });

    if (s.status === 'locked') {
        if (s.lockExpiresAt && Date.now() >= s.lockExpiresAt) {
            clearLock(id);
        } else {
            return res.status(400).json({ message: `Seat ${id} is already locked by someone else.` });
        }
    }

    s.status = 'locked';
    s.lockOwner = owner;
    s.lockExpiresAt = Date.now() + LOCK_DURATION_MS;

    s.lockTimer = setTimeout(() => {
        if (s.status === 'locked' && s.lockExpiresAt && Date.now() >= s.lockExpiresAt) {
            clearLock(id);
            console.log(`Lock expired for seat ${id}`);
        }
    }, LOCK_DURATION_MS + 100);

    return res.json({ message: `Seat ${id} locked successfully. Confirm within 1 minute.`, lockOwner: owner, expiresAt: new Date(s.lockExpiresAt).toISOString() });
});

app.post('/confirm/:id', (req, res) => {
    const id = String(req.params.id);
    const providedOwner = req.body && req.body.owner ? String(req.body.owner) : null;
    const s = seats[id];

    if (!s) return res.status(404).json({ message: `Seat ${id} does not exist.` });
    if (s.status !== 'locked') return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });

    if (!s.lockExpiresAt || Date.now() >= s.lockExpiresAt) {
        clearLock(id);
        return res.status(400).json({ message: 'Lock has expired. Seat cannot be booked' });
    }

    if (providedOwner && s.lockOwner && providedOwner !== s.lockOwner) {
        return res.status(403).json({ message: 'You do not own the lock for this seat' });
    }

    if (s.lockTimer) {
        clearTimeout(s.lockTimer);
        s.lockTimer = null;
    }
    s.lockExpiresAt = null;
    s.lockOwner = null;
    s.status = 'booked';

    return res.json({ message: `Seat ${id} booked successfully!` });
});

app.post('/release/:id', (req, res) => {
    const id = String(req.params.id);
    const providedOwner = req.body && req.body.owner ? String(req.body.owner) : null;
    const s = seats[id];
    if (!s) return res.status(404).json({ message: `Seat ${id} does not exist.` });
    if (s.status !== 'locked') return res.status(400).json({ message: 'Seat is not locked' });
    if (providedOwner && s.lockOwner && providedOwner !== s.lockOwner) return res.status(403).json({ message: 'You do not own the lock for this seat' });

    clearLock(id);
    return res.json({ message: `Lock on seat ${id} released.` });
});

app.listen(PORT, () => {
    console.log(`Seat booking server running at http://localhost:${PORT}`);
});
