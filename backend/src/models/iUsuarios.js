const { DataTypes } = require("sequelize");

const usuarios = {
  num_identidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primer_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundo_nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  primer_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundo_apellido: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: false,
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
