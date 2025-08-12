// backend/controller/AttivitaController.js

const express = require('express');
const AttivitaService = require('../service/AttivitaService');

function createAttivitaRouter(db) {
  const router = express.Router();
  const service = new AttivitaService(db);

  router.post('/', async (req, res) => {
    try {
      const attivita = await service.create(req.body);
      res.status(201).json(attivita);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const { creatore } = req.query;
      const attivita = await service.getAll(creatore);
      res.json(attivita);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const attivita = await service.getById(req.params.id);
      if (!attivita) return res.status(404).json({ error: 'Attività non trovata' });
      res.json(attivita);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const attivita = await service.update(req.params.id, req.body);
      if (!attivita) return res.status(404).json({ error: 'Attività non trovata' });
      res.json(attivita);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Attività non trovata' });
      res.json({ message: 'Attività eliminata' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch('/:id/completa', async (req, res) => {
    try {
      const attivita = await service.complete(req.params.id);
      if (!attivita) return res.status(404).json({ error: 'Attività non trovata' });
      res.json(attivita);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createAttivitaRouter;
