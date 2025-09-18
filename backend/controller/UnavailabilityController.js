// backend/controller/UnavailabilityController.js

const express = require('express');


class UnavailabilityController {

  constructor(db){
    this.router = express.Router();
    this.UnavailabilityService = new (require('../service/UnavailabilityService'))(db);

    this.router.post("/create", this.create.bind(this));
    // this.router.get("/:user", this.getAll().bind(this));

  }


  async create(req, res) {
    try {
      const auth = req.headers.authorization;

      await this.UnavailabilityService.createUnav(auth, req.body);
      res.status(201).ok;
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }



  /*
    async getAll(req, res) {
      // const user = req.params.user;  //non accetta params

      try {
        const entries = await this.UnavailabilityService.getByUser(user);
        res.json(entries);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
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
    }); */
 

} 

module.exports = UnavailabilityController;
