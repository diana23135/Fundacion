//importa la cofiguracion
const config = require('../config/config');
//import axios para conectarse a API-Gateway de aws
const axios = require('axios');

//obtenemos url base de aws
const local = config.localConnect;

const deleteImage = async (taskId, userId, fileName) => {
  try {
    const response = await axios.delete(`${local}/imagenes`, {
      params: {
        idTask: taskId,
        idUser: userId,
        fileName: fileName
      },
      responseType: 'json'
    });
    
    console.log(`Imagen eliminada: taskId=${taskId}, userId=${userId}, fileName=${fileName}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar la imagen: ${error.message}`);
  }
};

module.exports = { deleteImage};