const  Acudiente = require('../models/Acudiente'); 

const obtenerAcudiente = async () => {
    return await Acudiente.findAll();
};

const crearAcudiente = async (data) => {
    return await Acudiente.create(data);
};

const actualizarAcudiente = async (id, data) => {
    const acudiente= await Acudiente.findByPk(id);
    if (!acudiente) {
        throw new Error('Acudiente no encontrado');
    }
    await Acudiente.update(data);
    return acudiente;
};

const borrarAcudiente = async (id) => {
    const acudiente= await Acudiente.findByPk(id);
    if (!acudiente) {
        throw new Error('Acudiente no encontrado');
    }
    await Acudiente.destroy();
};

module.exports = {
     obtenerAcudiente,
     crearAcudiente,
     actualizarAcudiente,
     borrarAcudiente,
};
