const express = require('express');
const router = express.Router();
const { auth, verifySignUp } = require('../middleware/index');
const UserController = require('../controllers/user.controller');

// Rutas de usuarios con el uso de los middlewares
router.post('/signup', verifySignUp.checkDuplicateEmail, UserController.createUser);
router.post('/signin', UserController.signIn);

// Rutas de usuarios
router.post('/users', UserController.createUser);
router.get('/users/:userId/bootcamps', UserController.findUserById);
router.get('/users', UserController.findAll);
router.put('/users/:userId', UserController.updateUserById);
router.delete('/users/:userId', UserController.deleteUserById);

module.exports = router;
