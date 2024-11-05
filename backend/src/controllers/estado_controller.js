const  Estado = require('../models/Estado'); // Asegúrate de importar tu modelo correctamente

const obtenerEstado = async () => {
    return await Estado.findAll();
};

const obtenerUnEstado = async (id)=>{
    const existe = await Estado.findByPk(id);
    if (existe) {
    return existe;
    }
    return null;
}

const crearEstado = async (data) => {
    return await Estado.create(data);
};

const actualizarEstado = async (id, data) => {
    const estado = await Estado.findByPk(id);
    if (!estado) {
        throw new Error('Estado no encontrado');
    }
    await Estado.update(data);
    return estado;
};

const borrarEstado = async (id) => {
    const estado= await Estado.findByPk(id);
    if (!estado) {
        throw new Error('Estado no encontrado');
    }
    await Estado.destroy();
};

module.exports = {
    obtenerUnEstado,
     obtenerEstado,
     crearEstado,
     actualizarEstado,
     borrarEstado,
};
