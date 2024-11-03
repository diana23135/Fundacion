const  FormIn = require('../models/formIn'); // Asegúrate de importar tu modelo correctamente

const obtenerFormIn = async () => {
    return await FormIn.findAll();
};

const crearFormIn = async (data) => {
    return await FormIn.create(data);
};

const actualizarFormIn = async (id, data) => {
    const formIn= await FormIn.findByPk(id);
    if (!formIn) {
        throw new Error('FormIn no encontrado');
    }
    await FormIn.update(data);
    return formIn;
};

const borrarFormIn = async (id) => {
    const formIn= await FormIn.findByPk(id);
    if (!formIn) {
        throw new Error('FormIn no encontrado');
    }
    await FormIn.destroy();
};

module.exports = {
     obtenerFormIn,
     crearFormIn,
     actualizarFormIn,
     borrarFormIn,
};
