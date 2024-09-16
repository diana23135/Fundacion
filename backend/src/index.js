// server/index.js
// Importaciones
const express = require("express");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Configurar puerto por defecto o del entorno
const PORT = process.env.PORT || 3001;

// Crear una instancia de express
const app = express();

// Configurar información de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación (ECCARGO)',
      version: '1.0.0',
      description: 'Documentación y pruebas de API con Swagger para prueba técnica',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'] // Ruta a los archivos de rutas
};

// Inicializar Swagger-JSDoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configurar Swagger UI en una ruta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configurar JSON en express
app.use(express.json());

// Importación de la base de datos
require('./db');

// Importar rutas endpoints
const tareas = require("./routes/tareas");
const comentarios = require("./routes/comentarios");
const imagenes = require("./routes/imagenes");
const usuarios = require("./routes/usuarios");
const estados = require("./routes/estados");

// Usar dentro de express las rutas y definir sus endpoints
app.use("/tareas", tareas);
app.use("/comentarios", comentarios);
app.use("/imagenes", imagenes);
app.use("/usuarios", usuarios);
app.use("/estados", estados);

// Ejecutar express
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
