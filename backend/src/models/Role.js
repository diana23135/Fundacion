const {  DataTypes } = require('sequelize');
const sequelize = require('./ConnectHandler'); 

const Roles = sequelize.define('Roles',{
    id_role : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}
);

module.exports = Roles;
