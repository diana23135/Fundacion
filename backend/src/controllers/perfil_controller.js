const Perfil  = require('../models/Perfil'); // Asegúrate de importar tu modelo correctamente

const obtenerPerfils = async () => {
    return await Perfil.findAll();
};

const crearPerfils = async (data) => {
    return await Perfil.create(data);
};

const actualizarPerfils = async (id, data) => {
    const perfil = await Perfil.findByPk(id);
    if (!perfil) {
        throw new Error('Perfil no encontrado');
    }
    await Perfil.update(data);
    return perfil;
};

const borrarPerfils = async (id) => {
    const perfil = await Perfil.findByPk(id);
    if (!perfil) {
        throw new Error('Perfil no encontrado');
    }
    await Perfil.destroy();
};

module.exports = {
    obtenerPerfils,
    crearPerfils,
    actualizarPerfils,
    borrarPerfils,
};
