const Role  = require('../models/Role'); // Asegúrate de importar tu modelo correctamente

const obtenerRoles = async () => {
    return await Role.findAll();
};

const crearRoles = async (data) => {
    return await Role.create(data);
};

const actualizarRoles = async (id, data) => {
    const role = await Role.findByPk(id);
    if (!role) {
        throw new Error('Role no encontrado');
    }
    await Role.update(data);
    return role;
};

const borrarRoles = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) {
        throw new Error('Role no encontrado');
    }
    await Role.destroy();
};

module.exports = {
    obtenerRoles,
    crearRoles,
    actualizarRoles,
    borrarRoles,
};
