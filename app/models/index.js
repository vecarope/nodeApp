const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.User = require('./user.model')(sequelize);
db.Bootcamp = require('./bootcamp.model')(sequelize);

// Definir relaciones entre modelos, si las hay
// Ejemplo: Relación de muchos a muchos entre User y Bootcamp
db.User.belongsToMany(db.Bootcamp, {
  through: 'UserBootcamp',
  as: 'Bootcamps',
  foreignKey: 'userId',
});
db.Bootcamp.belongsToMany(db.User, {
  through: 'UserBootcamp',
  as: 'Users',
  foreignKey: 'bootcampId',
});

module.exports = db;
