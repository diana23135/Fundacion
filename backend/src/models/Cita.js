
const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const especialista = require('./Especialista'); 
const paciente = require('./Pacientes');

const Cita = sequelize.define("Cita", {
    id_cita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, 
    },
    fk_paciente: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model:'Pacientes',
            key:"id_paciente",
        }
      },
    fk_especialista:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model:'Especialista',
            key:"id_especialista",
        }
      },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    motivo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    
});

module.exports = Cita;
