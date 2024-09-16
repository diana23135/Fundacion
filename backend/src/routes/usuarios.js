const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const user = require("../models/usuarios");
const validateDto = require("../middlewares/validateDto");
const { userDto, loginDto } = require("../dtos/dtos");

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Rutas relacionadas con la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombreUsuario:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 correo:
 *                   type: string
 *                   example: "juan@example.com"
 *                 contraseña:
 *                   type: string
 *                   example: "password123"
 *       400:
 *         description: ID es requerido
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/", async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    try {
      const result = await user.findByPk(userId);
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ error: "ERROR! No se encontró el ID" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  return res.status(400).json({ error: "ID es requerido" });
});

/**
 * @swagger
 * /usuarios/get-all:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
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
 *                   nombreUsuario:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   correo:
 *                     type: string
 *                     example: "juan@example.com"
 *                   contraseña:
 *                     type: string
 *                     example: "password123"
 */
router.get("/get-all", async (req, res) => {
  try {
    const usuarios = await user.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

/**
 * @swagger
 * /usuarios:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       400:
 *         description: ID es requerido
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/", async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    try {
      const result = await user.destroy({ where: { id: userId } });
      if (result) {
        return res.status(200).json({ message: "Se eliminó con éxito el ID: " + userId });
      }
      return res.status(404).json({ error: "ERROR! No se encontró el ID" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  return res.status(400).json({ error: "ID es requerido" });
});

/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuarios]
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
 *               nombreUsuario:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 example: "juan@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: ID del usuario es requerido o campos inválidos para la actualización
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/", async (req, res) => {
  const updatedFields = ["nombreUsuario", "correo", "contraseña"];
  const userId = req.body.id;

  if (!userId) {
    return res.status(400).json({ error: "ID del usuario es requerido para la actualización" });
  }

  const values = Object.keys(req.body).filter(el => updatedFields.includes(el));

  if (values.length === 0) {
    return res.status(400).json({ error: "No se puede actualizar; no se encontró ningún campo válido para actualizar" });
  }

  const newBody = values.reduce((acc, el) => {
    acc[el] = req.body[el];
    return acc;
  }, {});

  try {
    const [affectedRows] = await user.update(newBody, { where: { id: userId } });
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 example: "juan@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Datos de usuario requeridos o usuario ya registrado
 *       500:
 *         description: Error al registrar el usuario
 */
router.post("/", validateDto(userDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      const email = body.correo;
      const usuario = await user.findOne({ where: { correo: email } });

      if (usuario) {
        return res.status(401).json({ error: "Usuario ya está registrado" });
      }

      await user.create(body);
      res.status(200).json({ message: "Se ha registrado con éxito el usuario" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor: " + error });
    }
  } else {
    res.status(400).json({ error: "Datos del usuario son requeridos" });
  }
});

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: "juan@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       202:
 *         description: Usuario autenticado con éxito
 *       401:
 *         description: Usuario no encontrado o credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", validateDto(loginDto), async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "No se ha encontrado un body" });
  }

  const email = body.correo;
  const pass = body.contraseña;

  try {
    const usuario = await user.findOne({ where: { correo: email } });

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = usuario.contraseña === pass; // En caso de que no uses hashing

    if (isPasswordValid) {
      return res.status(202).json(usuario);
    } else {
      return res.status(401).json({ error: "No se ha podido autenticar" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor: " + error });
  }
});

module.exports = router;
