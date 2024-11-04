
const Connecthandler = require('./ConnectHandler');

require('./association');
const Estados = require('./Estado');


Connecthandler.sync({ force: false })
.then(async () => {
    await Estados.bulkCreate([
        { nombre: 'Activo',descripcion :'el usuario se encuentra actualmente en la organizacion'},
        { nombre: 'En espera',descripcion :'no se ha confirmado el registro exitoso'},
        { nombre: 'Retirado',descripcion :'este usuario se dio de baja'},
        
    ]);
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});