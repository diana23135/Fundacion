const { DataTypes } = require('sequelize');
const sequelize = require("./ConnectHandler");

const Perfil = sequelize.define('Perfiles', {
    id_perfil: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates email format
        },
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100], // Ensures password is between 8 and 100 characters
        },
    },
    fk_role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: 'Roles', // Use the plural form if the table is named Roles
            key: "id_role",
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Perfil;
