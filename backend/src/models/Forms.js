const {DataTypes} = require('sequelize');
const sequelize = require('./ConnectHandler')

const Forms = sequelize.define('Forms', {
    id_form : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true, 
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull:false,
    },
    tipo : {
        type : DataTypes.STRING,
        allowNull:false,
    },
    form : {
        type : DataTypes.STRING,
        allowNull:false,
    },
    tabla : {
        type : DataTypes.STRING,
        allowNull:false,
    },
    campo : {
        type : DataTypes.STRING,
        allowNull:false,
    },
    estado : {
        type : DataTypes.STRING,
        allowNull:false,
    },
});


module.exports = Forms;