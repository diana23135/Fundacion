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
  ocupacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fk_paciente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Pacientes', // Referencia al modelo Acudientes
      key: 'id_paciente', // La clave primaria del modelo Acudientes
    },
  }

});

module.exports = Acudiente;
