const { DataTypes } = require("sequelize");

const usuarios = {
  tipo_identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_identidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  
 apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lugar_nacimiento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barrio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel_fijo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel_celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_usuario: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: 'Usuarios',
      key: "id_usuario",
    },
  },
  
};

module.exports = usuarios;
