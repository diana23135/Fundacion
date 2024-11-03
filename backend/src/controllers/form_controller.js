const  Form = require('../models/Forms'); // Asegúrate de importar tu modelo correctamente

const obtenerForm = async () => {
    return await Form.findAll();
};

const crearForm = async (data) => {
    return await Form.create(data);
};

const actualizarForm = async (id, data) => {
    const form = await Form.findByPk(id);
    if (!form) {
        throw new Error('Form no encontrado');
    }
    await Form.update(data);
    return form;
};

const borrarForm = async (id) => {
    const form= await Form.findByPk(id);
    if (!form) {
        throw new Error('Form no encontrado');
    }
    await Form.destroy();
};

module.exports = {
     obtenerForm,
     crearForm,
     actualizarForm,
     borrarForm,
};
