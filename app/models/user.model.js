const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo del nombre es requerido",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo del apellido es requerido",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Correo electrónico actualmente registrado en la base de datos.",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El correo electrónico es requerido",
        },
        isEmail: {
          args: true,
          msg: "Formato de correo inválido",
        },
      },
    },
  });

  return User;
};
