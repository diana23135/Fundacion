// models/CondicionesEspeciales.js
const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const CondicionesEspeciales = sequelize.define("CondicionesEspeciales", {
    id_condicion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    fk_usuario: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
          model: 'Usuarios',
          key: "id_usuario",
        },
      },
    condicion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripción:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_condicion:{
        type: DataTypes.STRING,
        allowNull: false,
    },



});

module.exports = CondicionesEspeciales;
