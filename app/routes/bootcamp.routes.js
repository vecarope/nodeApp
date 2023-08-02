const express = require('express');
const router = express.Router();
const bootcampController = require('../controllers/bootcamp.controller');

// Rutas de bootcamps
router.post('/bootcamps', bootcampController.createBootcamp);
router.post('/bootcamps/:bootcampId/users/:userId', bootcampController.addUser);
router.get('/bootcamps/:bootcampId', bootcampController.findById);
router.get('/bootcamps', bootcampController.findAll);

module.exports = router;