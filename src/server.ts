import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { getState, updateState, resetState } from './db.js';
import { bloodTypes, type BloodType } from './seed.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ── Inventory ──────────────────────────────────────────────────────────────
app.get('/api/inventory', (_req, res) => {
  res.json(getState().inventory);
});

// Hospital staff report a stock change for one blood type.
// body: { delta?: number, units?: number }
app.patch('/api/inventory/:type', (req, res) => {
  const type = decodeURIComponent(req.params.type) as BloodType;
  if (!bloodTypes.includes(type)) {
    return res.status(400).json({ error: `Unknown blood type: ${type}` });
  }
  const { delta, units } = req.body as { delta?: number; units?: number };
  let updated;
  updateState((s) => {
    const entry = s.inventory[type];
    if (typeof units === 'number') {
      entry.units = Math.max(0, Math.min(entry.max, units));
    } else if (typeof delta === 'number') {
      entry.units = Math.max(0, Math.min(entry.max, entry.units + delta));
    }
    updated = entry;
  });
  res.json(updated);
});

// ── Hospitals ──────────────────────────────────────────────────────────────
app.get('/api/hospitals', (_req, res) => {
  res.json(getState().hospitals);
});

app.post('/api/hospitals', (req, res) => {
  const { name, address, phone } = req.body as { name?: string; address?: string; phone?: string };
  if (!name || !address) {
    return res.status(400).json({ error: 'name and address are required' });
  }
  const hospital = { id: randomUUID(), name, address, phone: phone ?? '', needs: {} };
  updateState((s) => {
    s.hospitals.push(hospital);
  });
  res.status(201).json(hospital);
});

// ── Donors ─────────────────────────────────────────────────────────────────
app.get('/api/donors', (_req, res) => {
  res.json(getState().donors);
});

app.post('/api/donors', (req, res) => {
  const { name, type, city } = req.body as { name?: string; type?: BloodType; city?: string };
  if (!name || !type || !bloodTypes.includes(type)) {
    return res.status(400).json({ error: 'name and a valid blood type are required' });
  }
  const donor = { id: randomUUID(), name, type, city: city ?? '', daysSinceDonation: 0, available: true };
  updateState((s) => {
    s.donors.push(donor);
  });
  res.status(201).json(donor);
});

// ── Requests ───────────────────────────────────────────────────────────────
app.get('/api/requests', (_req, res) => {
  res.json(getState().requests);
});

app.post('/api/requests', (req, res) => {
  const { patient, type, hospital, urgency, units } = req.body as {
    patient?: string;
    type?: BloodType;
    hospital?: string;
    urgency?: 'critical' | 'high' | 'standard';
    units?: number;
  };
  if (!patient || !type || !hospital || !bloodTypes.includes(type)) {
    return res.status(400).json({ error: 'patient, hospital, and a valid blood type are required' });
  }
  const request = {
    id: randomUUID(),
    patient,
    type,
    hospital,
    urgency: urgency ?? 'standard',
    units: units ?? 1,
    createdAt: new Date().toISOString(),
  };
  updateState((s) => {
    s.requests.unshift(request);
  });
  res.status(201).json(request);
});

// ── Alerts ─────────────────────────────────────────────────────────────────
app.get('/api/alerts', (_req, res) => {
  res.json(getState().alerts);
});

// ── Dev utility: restore seed data ────────────────────────────────────────
app.post('/api/reset', (_req, res) => {
  resetState();
  res.json(getState());
});

app.listen(PORT, () => {
  console.log(`BloodLink backend listening on http://0.0.0.0:${PORT}`);
  console.log(`On your phone (same Wi-Fi), reach it at your computer's LAN IP, e.g. http://192.168.1.125:${PORT}`);
});
