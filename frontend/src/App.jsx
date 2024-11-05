import "./App.css";
import { Inicio } from "./views/Inicio/Inicio";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { Formulario } from "./views/utils/Formulario/Formulario";
import {VisualizarRegistro} from "./views/VisualizarRegistro/VisualizarRegistro"
import { useEffect, useState } from "react";


export function App() {

  const [Entrevista, setEntrevista] = useState([]);
  // const [Registro, setRegistro] = useState([]);
  const datos = 
    {
        "paciente": {
            "id_paciente": 1,
            "tipo_identificacion": "cc",
            "num_identidad": "123123",
            "nombre": "Christian Pool",
            "apellido": "Padilla",
            "edad": -1,
            "fecha_nacimiento": "2024-11-12T00:00:00.000Z",
            "lugar_nacimiento": "123123",
            "direccion": "cra 12 a este # 46 - 11 s",
            "barrio": "123123",
            "tel_fijo": "3142455909",
            "tel_celular": "31231",
            "fk_usuario": 1,
            "sexo": "masculino",
            "diagnostico": "asdasd",
            "escolarizado": true,
            "nom_institucion": "12312",
            "jornada": "mañana",
            "curso": "123123",
            "eps": "123123",
            "terapias": "true",
            "donde": "12312",
            "talla_zapatos": "3123",
            "talla_sudadera": "12321",
            "util_panial": true,
            "etapa": 1231,
            "obs_expectativas": "1231",
            "areas_interes": "123123",
            "createdAt": "2024-11-05T02:42:21.697Z",
            "updatedAt": "2024-11-05T02:42:21.697Z"
        },
        "acudientes": [],
        "usuario": {
            "id_usuario": 1,
            "fk_estado": 1,
            "createdAt": "2024-11-05T02:42:21.488Z",
            "updatedAt": "2024-11-05T02:42:21.488Z"
        },
        "estado": {
            "id_estado": 1,
            "nombre": "Activo",
            "descripcion": "el usuario se encuentra actualmente en la organizacion",
            "createdAt": "2024-11-05T02:39:47.499Z",
            "updatedAt": "2024-11-05T02:39:47.499Z"
        },
        "files": [
            {
                "id_documento": 1,
                "fk_paciente": 1,
                "tipo_documento": "foto de perfil",
                "fecha_insercion": "2024-11-05T02:42:21.906Z",
                "vigencia": "2026-11-05T02:42:21.906Z",
                "archivo_adjunto": "C:\\Users\\Dego_Leiv\\Documents\\Fundacion\\backend\\src\\controllers\\utils\\public\\uploads\\123123\\foto_perfil.png",
                "createdAt": "2024-11-05T02:42:21.908Z",
                "updatedAt": "2024-11-05T02:42:21.908Z"
            }
        ]
    };
    

  useEffect(() => {
    fetch("public/templates/Entrevista.json")
      .then((response) => response.json())
      .then((data) => setEntrevista(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // useEffect(() => {
  //   fetch("public/templates/Registro.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('registro',data);
        
  //       setRegistro(data)})
  //     .catch((error) => console.error("Error al cargar los datos:", error));
  // }, []);

  return (
    <>
    <ToastContainer />
      <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Inicio" element={<Inicio/>} />
      <Route path="/formulario" element={<Formulario formulario={Entrevista}/>} />

      <Route path="/visualizar" element = {<VisualizarRegistro pacienteData={datos}/>}/>

      </Routes>
      </Router>
    </>
  );
}
