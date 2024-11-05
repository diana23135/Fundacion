const TablaParametro  = require('../models/TablaParametros'); // Asegúrate de importar tu modelo correctamente

const obtenerTablaParametros = async () => {
    return await TablaParametro.findAll();
};

const obtenerUnaTablaParametros = async (n) => {
    return await TablaParametro.findOne({where:{nombre : n}});
};


const crearTablaParametros = async (data) => {
    return await TablaParametro.create(data);
};

const actualizarTablaParametros = async (id, data) => {
    const tablaParametro = await TablaParametro.findByPk(id);
    if (!tablaParametro) {
        throw new Error('TablaParametro no encontrado');
    }
    await TablaParametro.update(data);
    return tablaParametro;
};

const borrarTablaParametros = async (id) => {
    const tablaParametro = await TablaParametro.findByPk(id);
    if (!tablaParametro) {
        throw new Error('TablaParametro no encontrado');
    }
    await TablaParametro.destroy();
};

module.exports = {
    obtenerTablaParametros,
    crearTablaParametros,
    actualizarTablaParametros,
    borrarTablaParametros,
    obtenerUnaTablaParametros
};
