import "./App.css";
import { Inicio } from "./views/Inicio/Inicio";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { Formulario } from "./views/utils/Formulario/Formulario";
import React, { useEffect, useState } from "react";

export function App() {

  const [Entrevista, setEntrevista] = useState([]);

  useEffect(() => {
    fetch("/Entrevista.json")
      .then((response) => response.json())
      .then((data) => setEntrevista(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  return (
    <>
    <ToastContainer />
      <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Inicio" element={<Inicio/>} />
      <Route path="/formulario" element={<Formulario formulario={Entrevista}/>} />
      </Routes>
      </Router>
    </>
  );
}
