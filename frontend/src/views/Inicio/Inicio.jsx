import { useEffect, useState } from "react";
import "./Inicio.css";
import { Footer } from "../utils/Footer/Footer";
import { Nav } from "../utils/Nav/Nav";
import { Contadores } from "../utils/Contadores/Contadores";
import { Buscadores } from "../utils/Buscadores/Buscadores";
import { Tabla } from "../utils/Tabla/Tabla";


export function Inicio() {
  const [datos, setDatos] = useState([]);
  const [contadores, setContadores] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primera llamada: Obtener campos predeterminados
        const response1 = await fetch("/tabla-parametros/get-one?id=pacientes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response1.ok) {
          throw new Error("Error en la solicitud al servidor");
        }
  
        const data1 = await response1.json();
        const fields = data1.data.fields_default.split(',');
  
        // Guarda los campos obtenidos
  
        // Segunda llamada: Obtener pacientes
        const response2 = await fetch("/paciente/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response2.ok) {
          throw new Error("Error en la solicitud al servidor");
        }
  
        const data2 = await response2.json();
  
        // Función para acceder a propiedades anidadas
        const getNestedProperty = (obj, path) => {
          return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
        };
  
        // Mapea cada paciente solo con los campos solicitados
        const pacientes = data2.data.map((ele) => {
          const result = fields.reduce((acc, field) => {
            acc[field] = getNestedProperty(ele, field);
            return acc;
          }, {});
          return result;
        });
  
        // Actualiza el estado con los datos de pacientes y estados
        const estados = data2.data.map((ele) => ele.estado);
  
        setContadores(estados);
        setDatos(pacientes);
  
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);
  


 

  return (
    <>
      <main>
        <Nav />
        <Buscadores />
        <Contadores  contadores = {contadores} />
        <Tabla datos={datos} />
  
      </main>
      <Footer />
    </>
  );
}
