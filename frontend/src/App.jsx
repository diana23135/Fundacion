import "./App.css";
import { Inicio } from "./views/Inicio/Inicio";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { Formulario } from "./views/utils/Formulario/Formulario";
import {VisualizarRegistro} from "./views/VisualizarRegistro/VisualizarRegistro"
import { useEffect, useState } from "react";
import { HistoriasClinicas } from "./views/Historias/Historias";


export function App() {

  const [Entrevista, setEntrevista] = useState([]);
  // const [Registro, setRegistro] = useState([]);
 
    

    

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

      <Route path="/visualizar" element = {<VisualizarRegistro/>}/>
      <Route path="/historias" element = {<HistoriasClinicas/>}/>


      </Routes>
      </Router>
    </>
  );
}
