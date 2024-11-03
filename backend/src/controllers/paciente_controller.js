const Paciente  = require('../models/Pacientes'); // Asegúrate de importar tu modelo correctamente

const obtenerPacientes = async () => {
    return await Paciente.findAll();
};

const crearPacientes = async (data) => {
    return await Paciente.create(data);
};

const actualizarPacientes = async (id, data) => {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    await Paciente.update(data);
    return paciente;
};

const borrarPacientes = async (id) => {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    await Paciente.destroy();
};

module.exports = {
    obtenerPacientes,
    crearPacientes,
    actualizarPacientes,
    borrarPacientes,
};
