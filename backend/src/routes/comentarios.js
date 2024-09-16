const validateDto = require("../middlewares/validateDto");
const { commentDto } = require("../dtos/dtos");
const express = require("express");
const router = express.Router();
const comments = require("../models/comentarios");

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Rutas para la gestión de comentarios
 */

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Obtiene los comentarios asociados a una tarea por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la tarea cuyos comentarios se desean obtener
 *     responses:
 *       200:
 *         description: Comentarios encontrados
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
 *                   titulo:
 *                     type: string
 *                     example: "Título del comentario"
 *                   contenido:
 *                     type: string
 *                     example: "Contenido del comentario"
 *       404:
 *         description: No se encontró la tarea con el ID proporcionado
 */
router.get("/", async (req, res) => {
  const taskId = req.query.id;
  if (taskId) {
    const result = await comments.findAll({ where: { idTarea: taskId } });
    return res.status(200).json(result);
  }
  res.status(404).json({ error: "ERROR! No se encontró el ID de la tarea" });
});

/**
 * @swagger
 * /comentarios/get-all:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de comentarios
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
 *                   titulo:
 *                     type: string
 *                     example: "Título del comentario"
 *                   contenido:
 *                     type: string
 *                     example: "Contenido del comentario"
 */
router.get("/get-all", async (req, res) => {
  const comentarios = await comments.findAll();
  res.json(comentarios);
});

/**
 * @swagger
 * /comentarios:
 *   delete:
 *     summary: Elimina un comentario por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado con éxito
 *       404:
 *         description: No se encontró el comentario con el ID proporcionado
 */
router.delete("/", async (req, res) => {
  const commentId = req.query.id;
  if (commentId) {
    await comments.destroy({ where: { id: commentId } });
    return res.status(200).json({ message: "Comentario eliminado con éxito: " + commentId });
  }
  res.status(404).json({ error: "ERROR! No se encontró el ID del comentario" });
});

/**
 * @swagger
 * /comentarios:
 *   put:
 *     summary: Actualiza un comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: "Nuevo título"
 *               contenido:
 *                 type: string
 *                 example: "Nuevo contenido"
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente
 *       400:
 *         description: ID o campos inválidos para la actualización
 *       404:
 *         description: Comentario no encontrado
 */
router.put("/", async (req, res) => {
  const updatedFileds = ["titulo", "contenido"];
  const commentsId = req.body.id;

  if (!commentsId) {
    return res
      .status(400)
      .json({ error: "El ID del comentario es requerido para la actualización" });
  }

  const values = Object.keys(req.body).filter((el) => updatedFileds.includes(el));

  if (values.length === 0) {
    return res.status(400).json({
      error:
        "No se puede actualizar; no se encontró ningún campo válido para actualizar",
    });
  }

  const new_body = values.reduce((acc, el) => {
    acc[el] = req.body[el];
    return acc;
  }, {});

  try {
    const [affectedRows] = await comments.update(new_body, {
      where: {
        id: commentsId,
      },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json({ message: "Comentario actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el comentario:", err);
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
});

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Título del comentario"
 *               contenido:
 *                 type: string
 *                 example: "Contenido del comentario"
 *     responses:
 *       200:
 *         description: Comentario registrado con éxito
 *       500:
 *         description: Error al registrar el comentario
 */
router.post("/", validateDto(commentDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      await comments.create(body);
      res.status(200).json({ message: "Comentario registrado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "No se ha podido registrar el comentario: " + error });
    }
  }
});

module.exports = router;
