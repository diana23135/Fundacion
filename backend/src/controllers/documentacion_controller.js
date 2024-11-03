const  Documentacion = require('../models/Documentacion'); 
const obtenerDocumentacion = async () => {
    return await Documentacion.findAll();
};

const crearDocumentacion = async (data) => {
    return await Documentacion.create(data);
};

const actualizarDocumentacion = async (id, data) => {
    const documentacion = await Documentacion.findByPk(id);
    if (!documentacion) {
        throw new Error('Documentacion no encontrado');
    }
    await Documentacion.update(data);
    return documentacion;
};

const borrarDocumentacion = async (id) => {
    const documentacion = await Documentacion.findByPk(id);
    if (!documentacion) {
        throw new Error('Documentacion no encontrado');
    }
    await Documentacion.destroy();
};

module.exports = {
    obtenerDocumentacion,
    crearDocumentacion,
    actualizarDocumentacion,
    borrarDocumentacion,
};
