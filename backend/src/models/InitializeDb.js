
const Connecthandler = require('./ConnectHandler');

require('./association');



Connecthandler.sync({ force: true })
.then(async () => {
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});