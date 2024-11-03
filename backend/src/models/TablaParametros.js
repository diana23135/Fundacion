const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const TablasParametro = sequelize.define("TablasParametro", {
  id_parametro: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombre: {
    type : DataTypes.STRING,
    allowNull: false,   
  },

  tabla: {
    type : DataTypes.STRING,
    allowNull: false,
  },
  titulo: {
    type : DataTypes.STRING,
    allowNull: false,
  },
  fields_default: {
    type : DataTypes.STRING,
    allowNull: false,
  },

  fk_perfil: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: 'Perfiles',
      key: "id_perfil",
    },
  },
  });

module.exports =  TablasParametro ;
