const role = require('./Role');

const forms = require('./Forms');
const perfil = require('./Perfil');
const paciente = require('./Pacientes');

const acudiente = require('./Acudiente');
const especialista = require('./Especialista');

const cita = require('./Cita');
const documentacion = require('./Documentacion');
const condiciones_especiales = require('./CondicionesEspeciales');
const historico = require('./Historico');
const tablaParametro = require('./TablaParametros');
const forminprogres = require('./formIn');
const usuario = require('./Usuario');
const estado = require('./Estado');




usuario.hasMany(paciente, {foreignKey: 'fk_usuario'});
paciente.belongsTo(usuario, {foreignKey: 'fk_usuario'});

usuario.hasMany(especialista, {foreignKey: 'fk_usuario'});
especialista.belongsTo(usuario, {foreignKey: 'fk_usuario'});

usuario.hasMany(acudiente, {foreignKey: 'fk_usuario'});
acudiente.belongsTo(usuario, {foreignKey: 'fk_usuario'});

usuario.hasMany(condiciones_especiales, {foreignKey: 'fk_usuario'});
condiciones_especiales.belongsTo(usuario, {foreignKey: 'fk_usuario'});

// Relaciones entre perfil y role
role.hasMany(perfil, { foreignKey: 'fk_role' });
perfil.belongsTo(role, { foreignKey: 'fk_role' });


// Relación entre perfil y tablas secundarias
perfil.hasMany(forminprogres, { foreignKey: 'fk_perfil' });
forminprogres.belongsTo(perfil, { foreignKey: 'fk_perfil' });

perfil.hasMany(tablaParametro, { foreignKey: 'fk_perfil' });
tablaParametro.belongsTo(perfil, { foreignKey: 'fk_perfil' });

// Relación entre paciente, acudiente y especialista
paciente.hasMany(acudiente, { foreignKey: 'fk_paciente' });
acudiente.belongsTo(paciente, { foreignKey: 'fk_paciente' });

// Relación entre cita y otros modelos
paciente.hasMany(cita, { foreignKey: 'fk_paciente' });
cita.belongsTo(paciente, { foreignKey: 'fk_paciente' });

especialista.hasMany(cita, { foreignKey: 'fk_especialista' });
cita.belongsTo(especialista, { foreignKey: 'fk_especialista' });

cita.hasMany(historico, { foreignKey: 'fk_cita' });
historico.belongsTo(cita, { foreignKey: 'fk_cita' });

// Relación entre estado y varios modelos
estado.hasMany(usuario, { foreignKey: 'fk_estado' });
usuario.belongsTo(estado, { foreignKey: 'fk_estado' });



module.exports = {
  acudiente, cita,
  condiciones_especiales, documentacion,
  especialista, estado, 
  forminprogres,
  historico, paciente,
  perfil, role,
  tablaParametro, forms
};
