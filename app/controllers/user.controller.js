const { users, bootcamps } = require('../models');
const db = require('../models');
const User = db.users;
const Bootcamp = db.bootcamps;

// Crear y Guardar Usuarios
exports.createUser = (user) => {
  return User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`);
      throw err;
    });
};

// Obtener los bootcamp de un usuario por su id
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(user => {
      return user;
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el usuario: ${err}`);
      throw err;
    });
};

// Obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(users => {
    return users;
  }).catch((err) => {
    console.log(">> Error Buscando los Usuarios: ", err);
    throw err;
  });
};

// Actualizar usuario por Id
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
      firstName: fName,
      lastName: lName
    }, {
      where: {
        id: userId
      }
    })
    .then((result) => {
      if (result[0] === 0) {
        console.log(`>> No se encontró ningún usuario con el id ${userId}`);
        return null;
      }
      console.log(`>> Se ha actualizado el usuario con id=${userId}`);
      return result;
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
      throw err;
    });
};

// Eliminar un usuario por Id
exports.deleteUserById = (userId) => {
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then((result) => {
      if (result === 0) {
        console.log(`>> No se encontró ningún usuario con el id ${userId}`);
        return null;
      }
      console.log(`>> Se ha eliminado el usuario con id=${userId}`);
      return result;
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`);
      throw err;
    });
};

