const Paciente  = require('../models/Pacientes'); 
const acudiente_controller  = require('./acudiente_controller');
const usuario_controller  = require('./usuario_controller');
const condiciones_controller  = require('./condicionesEspeciales_controller');


const obtenerPacientes = async () => {
    return await Paciente.findAll();
};

const pacienteExist = async (numero)=>{
    const usuario = await Paciente.findOne({
        where: { num_identidad: numero } // Cambia `email` por el campo único que desees verificar
      });
      if (usuario) {
        console.log('El usuario ya existe:', usuario);
        return true;
      }
      return false;
}

const crearPacientes = async (data) => {

    let fk_acudiente; 
    let fk_acudiente2;
    let user;
    let acudiente_data;
    const location = {
        barrio: data.barrio,
        direccion: data.direccion,
        tel_fijo: data.telefono_fijo,
        tel_celular: data.telefono_celular,
        
    }

    // si un paciente no existe, no existe el usuario 

    fk_acudiente = acudiente_controller.AcudienteExist(data.identificacion_cuidador1);

    fk_acudiente2 = acudiente_controller.AcudienteExist(data.identificacion_cuidador1);
    
    if(!fk_acudiente){
        user = usuario_controller.crearUsuarios();
        acudiente_data = {
            num_identidad:data.identificacion_cuidador1 ,
            nombre: data.nombre_cuidador1,
            apellido: data.apellido_cuidador1,
            edad:data.edad_cuidador1,
            fecha_nacimiento: null, //no se pregunta esto en el formulario de ingreso
            lugar_nacimiento: null,//no se pregunta esto en el formulario de ingreso
            ...location,
            fk_usuario: user.id_usuario,
            parentesco: data.parentesco_cuidador1,
            correo_electronico: data.correo,
        };
        acudiente_controller.crearAcudiente(acudiente_data);
    }
    if(!fk_acudiente2){

//     "ocupacion_cuidador2": "sadsdas",
        user = usuario_controller.crearUsuarios();
        acudiente_data = {
            num_identidad:data.identificacion_cuidador2 ,
            nombre: data.nombre_cuidador2,
            apellido: data.apellido_cuidador2,
            edad:data.edad_cuidador2,
            fecha_nacimiento: null, //no se pregunta esto en el formulario de ingreso
            lugar_nacimiento: null,//no se pregunta esto en el formulario de ingreso
            ...location,
            fk_usuario: user.id_usuario,
            parentesco: data.parentesco_cuidador2,
            correo_electronico: data.correo,
        };
        acudiente_controller.crearAcudiente(acudiente_data);
    }
        acudiente_controller.crearAcudiente(acudiente);
    



    /** 
     * agregar logica de fotos 
     * verificar acudiente 
     * insertar acudiente 
     * obtener fk
     * 
     * verificar paciente 1 - 2  hacer el objeto de cada registro
     * insertar paciente 
     * obtener fk
     * 
     *  */ 
    
//    ss  =  {
//     "nombre": "asdsad",
//     "apellido": "asdasd",
//     "lugar_nacimiento": "asdasd",
//     "diagnostico": "sdasd",
//     "escolarizado": true,
//     "institucion": "asdas",
//     "jornada": "asdas",
//     "curso": "dasdas",
//     "eps": "dasda",
//     "terapias": true,
//     "donde": "sdasd",
//     


    // "fecha_nacimiento": "2222-03-12",
    //     "edad": "111"
// }









    return await Paciente.create(data);
};

const actualizarPacientes = async (id, data) => {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    await Paciente.update(data);
    return paciente;
};

const borrarPacientes = async (id) => {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    await Paciente.destroy();
};

module.exports = {
    pacienteExist,
    obtenerPacientes,
    crearPacientes,
    actualizarPacientes,
    borrarPacientes,
};
