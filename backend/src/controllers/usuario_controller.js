const Usuario  = require('../models/Usuario'); // Asegúrate de importar tu modelo correctamente

const obtenerUsuarios = async () => {
    return await Usuario.findAll();
};




const ObtenerUnUsuario = async (id)=>{
    const existe = await Usuario.findByPk(id);
      if (existe) {
        return existe;
      }
      return null;
}



const crearUsuarios = async (data) => {
    return await Usuario.create(data);
};

const actualizarUsuarios = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    await usuario.update(data);
    return usuario;
};

const borrarUsuarios = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    await usuario.destroy();
};

module.exports = {
    obtenerUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios,
    ObtenerUnUsuario
};
