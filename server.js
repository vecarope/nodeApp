const express = require('express');
const app = express();
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');
const db = require('./app/models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/user.controller');

// Middlewares y configuraciones de la aplicación...
// Aquí puedes configurar otros middlewares y ajustes para tu aplicación

// Rutas
app.use('/api', userRoutes);
app.use('/api', bootcampRoutes);

// Otro código de la aplicación...
// Aquí puedes agregar otras rutas, middlewares, etc.

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}.`);
  try {
    // Sincronizar la base de datos y luego ejecutar las operaciones con run()
    await db.sequelize.sync({ force: true });
    console.log('Base de datos sincronizada.');

    // Ejecutar las operaciones con la base de datos
    run();
  } catch (err) {
    console.error('Error al sincronizar la base de datos:', err);
  }
});

const run = async () => {
  try {
    // Crear usuarios
    const user1 = await userController.createUser({
      firstName: 'Mateo',
      lastName: 'Díaz',
      email: 'mateo.diaz@correo.com',
    });

    const user2 = await userController.createUser({
      firstName: 'Santiago',
      lastName: 'Mejias',
      email: 'santiago.mejias@correo.com',
    });

    // Crear bootcamps
    const bootcamp1 = await bootcampController.createBootcamp({
      title: 'Introduciendo El Bootcamp De React',
      cue: 10,
      description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
    });

    const bootcamp2 = await bootcampController.createBootcamp({
      title: 'Bootcamp Desarrollo Web Full Stack',
      cue: 12,
      description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
    });

    // Agregar usuarios a los bootcamps
    await bootcampController.addUser(bootcamp1.id, user1.id);
    await bootcampController.addUser(bootcamp1.id, user2.id);
    await bootcampController.addUser(bootcamp2.id, user1.id);

    // Consultar el bootcamp(id) incluyendo los usuarios
    const _bootcamp1 = await bootcampController.findById(bootcamp1.id);
    console.log("Bootcamp 1: ", JSON.stringify(_bootcamp1, null, 2));

    // Consultar todos los bootcamps
    const bootcamps = await bootcampController.findAll();
    console.log("Bootcamps: ", JSON.stringify(bootcamps, null, 2));

    // Consultar los usuarios (id) incluyendo los bootcamps
    const _user = await userController.findUserById(user1.id);
    console.log("User 1: ", JSON.stringify(_user, null, 2));

    // Listar todos los usuarios con sus bootcamps
    const users = await userController.findAll();
    console.log("Usuarios: ", JSON.stringify(users, null, 2));

    // Actualizar usuario por id
    const updatedUser = await userController.updateUserById(user1.id, "Pedro", "Sánchez");
    console.log("Usuario actualizado: ", JSON.stringify(updatedUser, null, 2));

    // Eliminar un usuario por id
    // const deletedUser = await userController.deleteUserById(user1.id);
    // console.log("Usuario eliminado: ", JSON.stringify(deletedUser, null, 2));
  } catch (err) {
    console.error('Error al ejecutar las operaciones:', err);
  }
};
