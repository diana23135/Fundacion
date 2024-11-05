const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const TablaParametros = require("../controllers/tablaParametro_controller");
router.get("/", async (req, res) => {
    try {
        TablaParametros.obtenerTablaParametros ();
        return res.status(200).json({
            success : true,
            message : "se obtuvo con exito la informacion",
            data : null,
        })
    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Ocurrio un error al obtener acudientes",
            error: error.message
        })
    }
});

router.get("/get-one", async (req, res) => {
    try {
        // Extraer los parámetros de consulta
        const { id } = req.query;

        // Llama a la función con el parámetro si está presente
        const tablaParametros = await TablaParametros.obtenerUnaTablaParametros(id);

        return res.status(200).json({
            success: true,
            message: "Se obtuvo con éxito la información",
            data: tablaParametros,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error al obtener los parámetros",
            error: error.message,
        });
    }
});


router.delete("/", async (req, res) => {
    try {
        TablaParametros.borrarTablaParametros(id);
        return res.status(200).json({
            success : true,
            message : "se obtuvo con exito la informacion",
            data : null,
        })
    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Ocurrio un error al obtener informacion",
            error: error.message
        })
    }
});
router.put("/", async (req, res) => {
    try {
        TablaParametros.actualizarTablaParametros();
        return res.status(200).json({
            success : true,
            message : "se obtuvo con exito la informacion",
            data : null,
        })
    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Ocurrio un error al obtener informacion",
            error: error.message
        })
    }
});
router.post("/", async (req, res) => {
    try {
        TablaParametros.crearTablaParametros();
        return res.status(200).json({
            success : true,
            message : "se obtuvo con exito la informacion",
            data : null,
        })
    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Ocurrio un error al obtener informacion",
            error: error.message
        })
    }
});
module.exports = router;
