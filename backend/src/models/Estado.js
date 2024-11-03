const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const Estado = sequelize.define("Estados", {
  id_estado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "activo"
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Estado;
