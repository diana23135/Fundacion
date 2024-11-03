const express = require("express");
const router = express.Router(); // creo el objeto de tipo router

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
