const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");
const usuarios = require('./iUsuarios'); 

const Paciente = sequelize.define("Pacientes", {
  id_paciente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Clave primaria
  },
  ...usuarios,
  sexo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  diagnostico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  escolarizado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nom_institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jornada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eps: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  terapias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  donde: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  talla_zapatos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  talla_sudadera: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  util_panial: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  etapa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  obs_expectativas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areas_interes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

module.exports = Paciente;
