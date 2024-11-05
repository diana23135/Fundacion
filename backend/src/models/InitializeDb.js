
const Connecthandler = require('./ConnectHandler');

require('./association');
const Estados = require('./Estado');
const TablaParametros = require('./TablaParametros');
const Role = require('./Role');
const Perfil = require('./Perfil');

Connecthandler.sync({ force: true })
.then(async () => {
    await Estados.bulkCreate([
        { nombre: 'Activo',descripcion :'el usuario se encuentra actualmente en la organizacion'},
        { nombre: 'En espera',descripcion :'no se ha confirmado el registro exitoso'},
        { nombre: 'Retirado',descripcion :'este usuario se dio de baja'},
        
    ]);

    const role = await Role.bulkCreate([{nombre:'Admin'}]);
    const perfil = await Perfil.bulkCreate([{
    correo: 'degocyx1211@gmail.com',
    contrasena: 'admin',
    fk_role: role.id_role}]);

    await TablaParametros.bulkCreate([
        { nombre: 'pacientes',
          titulo: 'Tabla Pacientes',
          fields_default: 'paciente.createdAt,paciente.nombre - paciente.apellido,paciente.num_identidad,paciente.direccion,paciente.tel_celular,estado.nombre',
          labels_default:'Fecha registro,Nombre del Paciente,Numero de identidad,Direccion,Telefono,Estado',
          fk_perfil:perfil.id_perfil},
  
    ]);
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});