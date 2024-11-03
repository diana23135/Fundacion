
const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const paciente = require('./Pacientes'); 
const especialista = require('./Especialista'); 

const Historico = sequelize.define("Historico", {
    id_historico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
    },
    fk_cita: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model:'Cita',
            key:"id_cita",
        }
      },
    
    fecha_insercion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valor predeterminado de la fecha actual
    },
    observacion:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    tipo_evento:{
        type: DataTypes.STRING,
        allowNull:false,
    },
  
    acciones_tomadas:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    seguimiento:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    pendientes:{
        type: DataTypes.STRING,
        allowNull:false,
    },
 });
module.exports = Historico;