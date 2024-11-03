const  Historico = require('../models/Historico'); // Asegúrate de importar tu modelo correctamente

const obtenerHistorico = async () => {
    return await Historico.findAll();
};

const crearHistorico = async (data) => {
    return await Historico.create(data);
};

const actualizarHistorico = async (id, data) => {
    const historico = await Historico.findByPk(id);
    if (!historico) {
        throw new Error('historico no encontrado');
    }
    await Historico.update(data);
    return historico;
};

const borrarHistorico = async (id) => {
    const historico = await Historico.findByPk(id);
    if (!historico) {
        throw new Error('historico no encontrado');
    }
    await Historico.destroy();
};

module.exports = {
     obtenerHistorico,
     crearHistorico,
     actualizarHistorico,
     borrarHistorico,
};
