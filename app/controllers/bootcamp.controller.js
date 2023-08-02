const { users, bootcamps } = require('../models');
const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (bootcamp) => {
  return Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description,
    })
    .then(bootcamp => {
      console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
      return bootcamp;
    })
    .catch(err => {
      console.log(`>> Error al crear el bootcamp: ${err}`);
      throw err;
    });
};

// Agregar un Usuario al Bootcamp
exports.addUser = async (bootcampId, userId) => {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      console.log("No se encontró el Bootcamp!");
      return null;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      console.log("Usuario no encontrado!");
      return null;
    }

    await bootcamp.addUser(user);
    console.log('***************************');
    console.log(`Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
    console.log('***************************');
    return bootcamp;
  } catch (err) {
    console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    throw err;
  }
};

// Obtener los bootcamp por id
exports.findById = (bootcampId) => {
  return Bootcamp.findByPk(bootcampId, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(bootcamp => {
      return bootcamp;
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
      throw err;
    });
};

// Obtener todos los Bootcamps incluyendo los Usuarios
exports.findAll = () => {
  return Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(bootcamps => {
    return bootcamps;
  }).catch((err) => {
    console.log(">> Error Buscando los Bootcamps: ", err);
    throw err;
  });
};
