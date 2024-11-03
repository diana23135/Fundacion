const  Especialista = require('../models/Especialista'); 

const obtenerEspecialista = async () => {
    return await Especialista.findAll();
};

const crearEspecialista = async (data) => {
    return await Especialista.create(data);
};

const actualizarEspecialista = async (id, data) => {
    const especialista = await Especialista.findByPk(id);
    if (!especialista) {
        throw new Error('Especialistano encontrado');
    }
    await Especialista.update(data);
    return especialista;
};

const borrarEspecialista = async (id) => {
    const especialista= await Especialista.findByPk(id);
    if (!especialista) {
        throw new Error('Especialistano encontrado');
    }
    await Especialista.destroy();
};

module.exports = {
     obtenerEspecialista,
     crearEspecialista,
     actualizarEspecialista,
     borrarEspecialista,
};
