const express = require("express");
const aws3 = require("../services/s3Service");
const router = express.Router(); // Creo el objeto de tipo router
const images = require("../models/imagenes");
const task = require("../models/tareas");
const validateDto = require("../middlewares/validateDto");
const { imageDto, imageEditDto } = require("../dtos/dtos");

/**
 * @swagger
 * tags:
 *   - name: Imágenes
 *     description: Rutas relacionadas con la gestión de imágenes
 */

/**
 * @swagger
 * /imagenes:
 *   get:
 *     summary: Obtiene una imagen por ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: query
 *         name: idTask
 *         schema:
 *           type: integer
 *         description: ID de la tarea asociada a la imagen
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         description: ID del usuario dueño de la imagen
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Nombre del archivo de imagen
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombreImagen:
 *                   type: string
 *                   example: Imagen de ejemplo
 *                 ruta:
 *                   type: string
 *                   example: /imagenes/ejemplo.jpg
 *       404:
 *         description: No se encontró la imagen
 */
router.get("/", async (req, res) => {
  const taskId = req.query.idTask;
  const userId = req.query.idUser;
  const fileName = req.query.fileName;

  if (taskId && userId && fileName) {
    const result = await images.findAll({ where: { idTarea: taskId } });
    if (result) {
      const image = aws3.getImage(userId, taskId, fileName);
      const finalResult = { ...image, ...result };
      res.status(200).json(finalResult);
    } else {
      res.status(404).json({ error: "ERROR! No se encontró la imagen" });
    }
  } else {
    res.status(400).json({ error: "Los ID son necesarios" });
  }
});

/**
 * @swagger
 * /imagenes/get-all:
 *   get:
 *     summary: Obtiene todas las imágenes asociadas a un usuario
 *     tags: [Imágenes]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de imágenes encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombreImagen:
 *                     type: string
 *                     example: Imagen de ejemplo
 *                   ruta:
 *                     type: string
 *                     example: /imagenes/ejemplo.jpg
 *       400:
 *         description: No se encuentran tareas asociadas a este usuario
 */
router.get("/get-all", async (req, res) => {
  const userId = req.query.idUser;

  if (userId) {
    try {
      const tasks = await task.findAll({ where: { idUsuario: userId } });

      if (tasks.length === 0) {
        return res.status(400).json({ error: "No se encuentran tareas asociadas a este usuario" });
      }

      let imagenes = [];

      for (const t of tasks) {
        const imagenesPorTarea = await images.findAll({ where: { idTarea: t.id } });
        imagenes.push(...imagenesPorTarea);
      }

      const awsImages = await aws3.getAll(userId);

      const base64Map = awsImages.reduce((map, image) => {
        const match = image.file_name.match(/\/(\d+)\//);
        if (match) {
          const idTarea = match[1];
          map[idTarea] = image.file_content_base64;
        }
        return map;
      }, {});

      const tareasConBase64 = imagenes.map((imagen) => {
        const base64 = base64Map[imagen.idTarea] || null;
        return { ...imagen, base64 };
      });

      res.status(200).json(tareasConBase64);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  } else {
    res.status(400).json({ error: "userId es obligatorio" });
  }
});

/**
 * @swagger
 * /imagenes:
 *   delete:
 *     summary: Elimina una imagen por ID de la tarea y usuario
 *     tags: [Imágenes]
 *     parameters:
 *       - in: query
 *         name: idTask
 *         schema:
 *           type: integer
 *         description: ID de la tarea asociada a la imagen
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         description: ID del usuario dueño de la imagen
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Nombre del archivo de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada con éxito
 *       404:
 *         description: No se pudo encontrar la imagen
 */
router.delete("/", async (req, res) => {
  const taskId = req.query.idTask;
  const userId = req.query.idUser;
  const fileName = req.query.fileName;

  if (taskId && userId && fileName) {
    try {
      const result = await images.destroy({ where: { idTarea: taskId } });

      if (result) {
        const imageDeleted = await aws3.deleteImage(userId, taskId, fileName);
        if (imageDeleted) {
          res.status(200).json({ message: "Imagen eliminada con éxito" });
        } else {
          res.status(500).json({ error: "No se pudo eliminar la imagen de AWS S3" });
        }
      } else {
        res.status(404).json({ error: "ERROR! No se pudo eliminar la imagen de la base de datos" });
      }
    } catch (error) {
      res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
    }
  } else {
    res.status(400).json({ error: "Los ID son necesarios" });
  }
});

/**
 * @swagger
 * /imagenes:
 *   put:
 *     summary: Actualiza una imagen
 *     tags: [Imágenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTask:
 *                 type: integer
 *                 example: 1
 *               nombreImagen:
 *                 type: string
 *                 example: Imagen actualizada
 *               fileBase64:
 *                 type: string
 *                 example: Imagen en formato base64
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       404:
 *         description: Imagen no encontrada
 */
router.put("/", validateDto(imageEditDto), async (req, res) => {
  try {
    const body = req.body;
    const awsBody = {
      user_id: body.user_id,
      task_id: body.task_id,
      image_name: body.image_name,
      fileBase64: body.fileBase64,
    };
    aws3.editImage(awsBody);

    res.status(200).json({ message: "Imagen actualizada correctamente" });
  } catch (err) {
    console.error("Error al actualizar la imagen:", err);
    res.status(500).json({ error: "Error al actualizar la imagen" });
  }
});

/**
 * @swagger
 * /imagenes:
 *   post:
 *     summary: Crea una nueva imagen
 *     tags: [Imágenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 example: 1
 *               idTarea:
 *                 type: integer
 *                 example: 1
 *               nombreImagen:
 *                 type: string
 *                 example: Imagen de ejemplo
 *               fileBase64:
 *                 type: string
 *                 example: Imagen en formato base64
 *     responses:
 *       200:
 *         description: Imagen registrada con éxito
 *       505:
 *         description: Error al registrar la imagen
 */
router.post("/", validateDto(imageDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      const awsBody = {
        user_id: body.idUser,
        task_id: body.idTarea,
        image_name: body.nombreImagen,
        fileBase64: body.fileBase64,
      };

      body.ruta = `${body.idUser}/${body.idTask}/${body.nombreImagen}`;
      delete body.fileBase64;
      await images.create(body);
      aws3.insertImage(awsBody);
      res.status(200).json({ message: "Se ha registrado con éxito la imagen" });
    } catch (error) {
      res.status(505).json({ error: "No se ha podido registrar: " + error });
    }
  } else {
    res.status(400).json({ error: "Datos de la imagen son requeridos" });
  }
});

module.exports = router;
