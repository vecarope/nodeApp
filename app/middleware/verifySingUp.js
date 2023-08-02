const db = require('../models');
const User = db.users;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({ message: 'El correo electrónico ya está registrado.' });
    }
    next();
  });
};

module.exports = checkDuplicateEmail;