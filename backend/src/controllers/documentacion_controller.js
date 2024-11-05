const  Documentacion = require('../models/Documentacion'); 
const { fk_usuario } = require('../models/iUsuarios');
const obtenerDocumentacion = async () => {
    return await Documentacion.findAll();
};

const crearDocumentacion = async (data) => {
    return await Documentacion.create(data);
};


const obtenerDocumentacionbyFK= async (id)=>{
    const existe = await Documentacion.findAll({where: {fk_paciente : id}});
    if (existe) {
    return existe;
    }
    return null;
}

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
    obtenerDocumentacionbyFK,
    obtenerDocumentacion,
    crearDocumentacion,
    actualizarDocumentacion,
    borrarDocumentacion,
};
