const { DataTypes } = require('sequelize');
const sequelize = require ('./ConnectHandler');

const Usuarios = sequelize.define ('Usuarios', {
    id_usuario : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        unique: true,
        primaryKey: true,
    },
    fk_estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model:'Estados',
            key:"id_estado",
        }
      },

});


module.exports = Usuarios;
