const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const {actualizarAcudiente, borrarAcudiente,crearAcudiente,obtenerAcudiente} = require("../controllers/acudiente_controller");
router.get("/", async (req, res) => {
    try {
        obtenerAcudiente();
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

router.delete("/", async (req, res) => {
    try {
        borrarAcudiente(id);
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
        actualizarAcudiente();
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
        crearAcudiente();
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
