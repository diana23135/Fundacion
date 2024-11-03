const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");
const usuarios = require('./iUsuarios'); 

const Acudiente = sequelize.define("Acudientes", {
  id_acudiente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Clave primaria
  },
  ...usuarios,
  parentesco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
  },



});

module.exports = Acudiente;
