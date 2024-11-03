const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const FormEnProgreso = sequelize.define('FormEnProgreso', {
    id_formEnProgreso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    form: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
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
    progreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Corrected the typo in the export statement
module.exports = FormEnProgreso;
