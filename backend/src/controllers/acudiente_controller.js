const  Acudiente = require('../models/Acudiente'); 

const AcudienteExist = async (numero)=>{
    const existe = await Acudiente.findOne({
        where: { num_identidad: numero } // Cambia `email` por el campo único que desees verificar
      });
      if (existe) {
        console.log('El usuario ya existe:', existe);
        return existe.id_acudiente;
      }
      return null;
}

const obtenerAcudiente = async () => {
    return await Acudiente.findAll();
};

const crearAcudiente = async (data) => {
    return await Acudiente.create(data);
};

const actualizarAcudiente = async (id, data) => {
    const acudiente= await Acudiente.findByPk(id);
    if (!acudiente) {
        throw new Error('Acudiente no encontrado');
    }
    await Acudiente.update(data);
    return acudiente;
};

const borrarAcudiente = async (id) => {
    const acudiente= await Acudiente.findByPk(id);
    if (!acudiente) {
        throw new Error('Acudiente no encontrado');
    }
    await Acudiente.destroy();
};

module.exports = {
    AcudienteExist,
    obtenerAcudiente,
    crearAcudiente,
    actualizarAcudiente,
    borrarAcudiente,
};
