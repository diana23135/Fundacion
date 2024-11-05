const { log } = require('console');
const fs = require('fs');
const path = require('path');


const base64toFile = function (base64String, filename, newfilename, directory) {
    // Asegurarse de que el directorio existe
    const dirPath = path.join(directory);
  
    // Remover el encabezado 'data:image/png;base64,' si está presente
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    
    const extension = filename.split('.').pop();

    // Convertir a un buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Definir la ruta completa del archivo
    const filePath = path.join(dirPath, `${newfilename}.${extension}`);
    
    // Guardar el archivo en el sistema
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            console.log('Archivo guardado exitosamente como', filename);
        }
    });

    return filePath;
};


const createPath = function (namefolder) {
    // Define la ruta base 'uploads'
    const baseDirectory = path.join(__dirname, 'public/uploads');
    
    // Verifica si la carpeta 'uploads' ya existe, y si no, la crea
    if (!fs.existsSync(baseDirectory)) {
        fs.mkdirSync(baseDirectory, { recursive: true });
        console.log('Carpeta "uploads" creada en:', baseDirectory);
    }

    // Define la ruta completa incluyendo la subcarpeta
    const directoryPath = path.join(baseDirectory, namefolder);

    // Verifica si la subcarpeta ya existe, y si no, la crea
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log('Subcarpeta creada en:', directoryPath);
    } else {
        console.log('La subcarpeta ya existe en:', directoryPath);
    }

    // Retorna la ruta del directorio
    return directoryPath;
};

function FileToBase64(filePath) {
    try {
        // Leer el archivo de forma sincrónica
        const data = fs.readFileSync(filePath);
        // Convertir el contenido del archivo a base64
        return data.toString('base64');
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        return null; // O maneja el error de acuerdo a tus necesidades
    }
}

module.exports = {base64toFile,createPath,FileToBase64}