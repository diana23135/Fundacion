import "./Inicio.css";
import { useEffect, useState } from "react"; // Importa useEffect y useState
import { Footer } from "../utils/Footer/Footer";
import { Nav } from "../utils/Nav/Nav";
import { Contadores } from "../utils/Contadores/Contadores";
import {Buscadores} from "../utils/Buscadores/Buscadores"
import { Tabla } from "../utils/Tabla/Tabla";

export function Inicio() {
  const [datos, setDatos] = useState([]); // Crea un estado para los datos

  useEffect(() => {
    fetch("/datos.json") // Asegúrate de que la ruta sea correcta
      .then((response) => response.json())
      .then((data) => setDatos(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  return (
    <>
      <main>
        <Nav />

        <Contadores />
        <Buscadores/>
        <Tabla datos={datos} /> {/* Pasa los datos a la Tabla */}
      </main>
      <Footer />
    </>
  );
}
