const  Cita = require('../models/Cita'); 

const obtenerCita = async () => {
    return await Cita.findAll();
};

const crearCita = async (data) => {
    return await Cita.create(data);
};

const actualizarCita = async (id, data) => {
    const cita= await Cita.findByPk(id);
    if (!cita) {
        throw new Error('Cita no encontrado');
    }
    await Cita.update(data);
    return cita;
};

const borrarCita = async (id) => {
    const cita= await Cita.findByPk(id);
    if (!cita) {
        throw new Error('Cita no encontrado');
    }
    await Cita.destroy();
};

module.exports = {
     obtenerCita,
     crearCita,
     actualizarCita,
     borrarCita,
};
