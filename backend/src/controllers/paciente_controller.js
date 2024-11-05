const Paciente  = require('../models/Pacientes'); 
const acudiente_controller  = require('./acudiente_controller');
const usuario_controller  = require('./usuario_controller');
const documentos_controller = require('./documentacion_controller');
const estados_controller = require('./estado_controller');

// const condiciones_controller  = require('./condicionesEspeciales_controller');
const file = require('./utils/file_manager');

const edad  = require('./utils/calcular_edad');

const obtenerPacientes = async () => {

    const pacientes_all = await Paciente.findAll();

    const resultados = await Promise.all(
        
        pacientes_all.map(async (ele) => {
        // Esperar a que se resuelvan todas las promesas asíncronas
        const acudientes = await acudiente_controller.obtenerUnAcudiente(ele.id_paciente);
        const usuario = await usuario_controller.ObtenerUnUsuario(ele.id_paciente);
        const estado = usuario ? await estados_controller.obtenerUnEstado(usuario.fk_estado) : null;
        const files = await documentos_controller.obtenerDocumentacionbyFK(ele.id_paciente);
        
        let base64;
        convertFileToBase64(files.archivo_adjunto)
        .then(data => {
            console.log(base64); 
            // Aquí tienes el archivo en Base64
            base64 = data
        })  
        .catch(err => {
            console.error('Error al leer el archivo:', err);
        });
        // Retornar un objeto con los datos para cada paciente
        return {
            paciente: ele,
            acudientes,
            usuario,
            estado,
            files,
            base64
        };
    }
));
    return resultados
};

const pacienteExist = async (numero)=>{
    const usuario = await Paciente.findOne({
        where: { num_identidad: numero } 

      });
      if (usuario) {
        console.log('El usuario ya existe:', usuario);
        return true;
      }
      return false;
}
const crearPacientes = async (data) => {
    let fk_acudiente, fk_acudiente2, usuario, acudiente_data, paciente;

    try {
        // Check if patient already exists
        paciente = await pacienteExist(data.num_identificacion);
        
        if (paciente) {
            return paciente; // If patient exists, return it immediately
        }
       
        try {
            usuario = await usuario_controller.crearUsuarios();
        } catch (error) {
            console.error("Error creating user for patient:", error);
         //   throw new Error("Failed to create user for patient.");
        }

        // Location data
        const location = {
            barrio: data.barrio,
            direccion: data.direccion,
            tel_fijo: data.telefono_fijo,
            tel_celular: data.telefono_celular,
        };

       

        // Patient data
        const paciente_data = {
            num_identidad: data.num_identificacion,
            tipo_identificacion: data.tipo_identificacion,
            nombre: data.nombre,
            apellido: data.apellido,
            edad: edad.calcularEdad(data.fecha_nacimiento),
            fecha_nacimiento: data.fecha_nacimiento,
            lugar_nacimiento: data.lugar_nacimiento,
            sexo:data.sexo,
            ...location,
            fk_usuario: usuario.id_usuario,
            diagnostico: data.diagnostico,
            escolarizado: data.escolarizado,
            nom_institucion: data.institucion,
            jornada: data.jornada,
            curso: data.curso,
            eps: data.eps,
            terapias: data.terapias,
            donde: data.donde,
            talla_zapatos: data.talla_zapatos,
            talla_sudadera: data.talla_sudadera,
            util_panial: data.util_panial,
            etapa: data.etapa,
            obs_expectativas: data.obs_expectativas,
            areas_interes: data.areas_interes,
        };
        // Create the patient
        try {
            paciente = await Paciente.create(paciente_data);
        } catch (error) {
            console.error("Error creating patient:", error);
          //  throw new Error("Failed to create patient.");
        }



        // Check and create first guardian (acudiente)
        try {
            fk_acudiente2 = await acudiente_controller.AcudienteExist(data.cuidador2_identificacion);
            if (!fk_acudiente2) {
                const acudiente_user2 = await usuario_controller.crearUsuarios();
                acudiente_data = {
                    num_identidad: data.cuidador2_identificacion,
                    tipo_identificacion: data.cuidador2_tipo_identificacion,
                    nombre: data.nombre_cuidador2,
                    apellido: data.apellido_cuidador2,
                    edad: edad.calcularEdad(data.cuidador2_fecha_nacimiento),
                    fecha_nacimiento:data.cuidador2_fecha_nacimiento,
                    ...location,
                    fk_usuario: acudiente_user2.id_usuario,
                    parentesco: data.parentesco_cuidador2,
                    ocupacion: data.ocupacion_cuidador2,
                    correo_electronico: data.correo,
                    fk_paciente: paciente.id_paciente,
                };
                await acudiente_controller.crearAcudiente(acudiente_data);
            }
        } catch (error) {
            console.error("Error checking or creating first guardian (acudiente):", error);
           // throw new Error("Failed to create first guardian.");
        }

        // Check and create first guardian (acudiente)
        try {
            fk_acudiente = await acudiente_controller.AcudienteExist(data.cuidador1_identificacion);
            if (!fk_acudiente) {
                const acudiente_user1 = await usuario_controller.crearUsuarios();
                acudiente_data = {
                    num_identidad: data.cuidador1_identificacion,
                    tipo_identificacion: data.cuidador1_tipo_identificacion,
                    nombre: data.nombre_cuidador1,
                    apellido: data.apellido_cuidador1,
                    edad: edad.calcularEdad(data.cuidador1_fecha_nacimiento),
                    fecha_nacimiento:data.cuidador1_fecha_nacimiento,
                    ...location,
                    fk_usuario: acudiente_user1.id_usuario,
                    parentesco: data.parentesco_cuidador1,
                    ocupacion: data.ocupacion_cuidador1,
                    correo_electronico: data.correo,
                    fk_paciente: paciente.id_paciente,
                };
                await acudiente_controller.crearAcudiente(acudiente_data);
            }
        } catch (error) {
            console.error("Error checking or creating first guardian (acudiente):", error);
           // throw new Error("Failed to create first guardian.");
        }


        const directory = file.createPath(data.num_identificacion);
        // base 64 de el archivo
        const filepath =  file.base64toFile(data.foto, data.foto_filename,'foto_perfil',directory);

        // Crear la fecha de inserción actual
        const fechaInsercion = new Date();

        // Calcular la vigencia como dos años después de la fecha de inserción
        const vigencia = new Date(fechaInsercion);
        vigencia.setFullYear(vigencia.getFullYear() + 2); // Agrega 2 años
        data_document = {
            fk_paciente: paciente.id_paciente,
            tipo_documento: 'foto de perfil',
            fecha_insercion:fechaInsercion,
            vigencia: vigencia,
            archivo_adjunto: filepath
        }
        await documentos_controller.crearDocumentacion(data_document);


        return paciente;

    } catch (error) {
        console.error("Error in crearPacientes function:", error);
      //  throw new Error("Failed to create patient and guardians.");
    }
};



  /** 
     * agregar logica de fotos 
     *  */ 


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
