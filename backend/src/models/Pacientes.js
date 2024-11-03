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
  util_pañal: {
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
  fk_acudiente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Acudientes', // Referencia al modelo Acudientes
      key: 'id_acudiente', // La clave primaria del modelo Acudientes
    },
   
    
  }
});

module.exports = Paciente;
