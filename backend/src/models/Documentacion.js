


const { DataTypes } = require("sequelize");
const sequelize = require("./ConnectHandler");

const Documentacion = sequelize.define("Documentacion", {
    id_documento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true, // Agregado para definir 'id' como clave primaria
        },
   
    fk_paciente: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model:'Pacientes',
            key:"id_paciente",
        }
      },
    tipo_documento:{
        type: DataTypes.STRING,
    },
    fecha_insercion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valor predeterminado de la fecha actual
    },

    vigencia:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    archivo_adjunto:{
        type: DataTypes.STRING, //RUTA AL SERVIDOR DE ARCHIVOS
    }
});

module.exports = Documentacion;
