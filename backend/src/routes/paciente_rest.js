const express = require("express");
const router = express.Router(); // creo el objeto de tipo router

const pacientes = require('../controllers/paciente_controller');


router.get("/", async (req, res) => {
    try {

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
router.get("/get-all", async (req, res) => {
    try {

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

        const paciente = await pacientes.crearPacientes(req.body);
        

        return res.status(200).json({
            success: true,
            message: "Información obtenida con éxito",
            registro: paciente,
        });
    } catch (error) {
    //     // Catch any errors from the crearPacientes function
        console.error("Error in POST / route:", error);
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error al obtener información",
            error: error.message,
        });
    }
});



module.exports = router;
