import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Inicio.css";
import { Footer } from "../utils/Footer/Footer";
import { Nav } from "../utils/Nav/Nav";
import { Contadores } from "../utils/Contadores/Contadores";
import { Buscadores } from "../utils/Buscadores/Buscadores";
import { Tabla } from "../utils/Tabla/Tabla";
import { VisualizarRegistro } from "../VisualizarRegistro/VisualizarRegistro";


export function Inicio() {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    fetch("/datos.json")
      .then((response) => response.json())
      .then((data) => setDatos(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    fetch("/registro.json")
      .then((response) => response.json())
      .then((data) => setRegistro(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // Función para manejar la navegación al formulario
  const handleCrearBeneficiario = () => {
    navigate("/formulario"); // Redirige a la ruta del formulario
  };

  return (
    <>
      <main>
        <Nav />
        <Buscadores />
        <Contadores onCrearBeneficiario={handleCrearBeneficiario} />{" "}
        {/* Pasa la función como prop */}
        <Tabla datos={datos} />
  
      </main>
      <Footer />
    </>
  );
}
