// backend/controller/UnavailabilityController.js

const express = require('express');
const UnavailabilityService = require('../service/UnavailabilityService');

function createUnavailabilityRouter(db) {
  const router = express.Router();
  const service = new UnavailabilityService(db);

  router.post('/', async (req, res) => {
    try {
      const entry = await service.create(req.body);
      res.status(201).json(entry);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/:utente', async (req, res) => {
    try {
      const entries = await service.getByUser(req.params.utente);
      res.json(entries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const updated = await service.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Non trovato' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Non trovato' });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createUnavailabilityRouter;
