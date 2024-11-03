const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");
const usuarios = require('./iUsuarios');
const Especialista = sequelize.define("Especialista", {
  // Definimos los atributos del modelo
  id_especialista: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
        ...usuarios,
        correo_electronico: {
          // Corrige el nombre del campo para que sea válido
        type: DataTypes.STRING,
        allowNull: false,
        },
        especialidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        titulos: {
          // Corrige el nombre del campo para que sea válido
        type: DataTypes.STRING,
        allowNull: false,
        },
        experiencia: {
          // Corrige el nombre del campo para que sea válido
          type: DataTypes.STRING,
          allowNull: false,
        },
        fk_perfil: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          references: {
              model: 'Perfiles', // Use the plural form if the table is named Roles
              key: "id_perfil",
          },
      },
     
      }
    );

module.exports = Especialista;
