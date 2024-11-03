const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

//definir la ruta a los endpoints
const acudiente_rest = require("./routes/acudiente_rest");
const cita_rest = require("./routes/cita_rest");
const ce_rest = require("./routes/condicionesEspeciales_rest");
const documentacion_rest = require("./routes/documentacion_rest");
const especialista_rest = require("./routes/especialista_rest");
const historico_rest = require("./routes/historico_rest");
const paciente_rest = require("./routes/paciente_rest");

app.use("/acudiente",acudiente_rest);
app.use("/cita",cita_rest);
app.use("/condiciones",ce_rest);
app.use("/documentacion",documentacion_rest);
app.use("/especialista",especialista_rest);
app.use("/historico",historico_rest);
app.use("/paciente",paciente_rest);

//inizializar base de datos 
require('./models/InitializeDb');

// ejecutar servidor
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo ${PORT}`);
});
