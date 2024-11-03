const  CondicionesEspeciales = require('../models/CondicionesEspeciales'); // Asegúrate de importar tu modelo correctamente

const obtenerCondicionesEspeciales  = async () => {
    return await CondicionesEspeciales.findAll();
};

const crearCondicionesEspeciales  = async (data) => {
    return await CondicionesEspeciales.create(data);
};

const actualizarCondicionesEspeciales  = async (id, data) => {
    const condicionesEspeciales = await CondicionesEspeciales.findByPk(id);
    if (!condicionesEspeciales ) {
        throw new Error('CondicionesEspeciales no encontrado');
    }
    await CondicionesEspeciales.update(data);
    return condicionesEspeciales ;
};

const borrarCondicionesEspeciales  = async (id) => {
    const condicionesEspeciales = await CondicionesEspeciales.findByPk(id);
    if (!condicionesEspeciales ) {
        throw new Error('CondicionesEspeciales no encontrado');
    }
    await CondicionesEspeciales.destroy();
};

module.exports = {
     obtenerCondicionesEspeciales ,
     crearCondicionesEspeciales ,
     actualizarCondicionesEspeciales ,
     borrarCondicionesEspeciales ,
};
