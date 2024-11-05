import { useEffect, useState } from "react";
import "./Inicio.css";
import { Footer } from "../utils/Footer/Footer";
import { Nav } from "../utils/Nav/Nav";

import { Tabla } from "../utils/Tabla/Tabla";
import { formatDate, isDate } from "../../scripts/date_format";

export function Inicio() {
  const [datos, setDatos] = useState([]);
  const [contadores, setContadores] = useState([]);
  const [titulo, setTitulo] = useState("");

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
        const labels = data1.data.labels_default.split(',');
        const titulo = data1.data.titulo;
        setTitulo(titulo);

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
        console.log(data2);
        
        // Función para acceder a propiedades anidadas
        const getNestedProperty = (obj, path) => {
          return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
        };
  
        // Mapea cada paciente solo con los campos solicitados
        const pacientes = data2.data.map((ele) => {

          const result = fields.reduce((acc, field, idx) => {
            field = field.replace(/\s+/g, '');
            
            let value;
            if (field.includes('-')){
              const concats = field.split('-');
              console.log(concats);
              

              value = concats.reduce((acc,concat)=>{
                const property = getNestedProperty(ele, concat);
                return  acc +property+ " ";
              },"");
            }else {
              value = getNestedProperty(ele, field);
            }
            
            acc[labels[idx]] = value;
            return acc;
          }, {});
          
          
          return result;
        });
  
        // Actualiza el estado con los datos de pacientes y estados
        const estados = data2.data.map((ele) => ele.estado);
        console.log(data2);
        
        pacientes.map(dic => {
          for (const key in dic) {
            const value = dic[key];
            if (typeof value === 'string' && isDate(value)) {
              dic[key] = formatDate(value);
            }

          }
          return dic; 
        });
        
        
        setContadores(estados);
        setDatos(pacientes);
        console.log('llegamos');
  
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
       
       
        <Tabla datos={datos} contadores={contadores} titulo ={titulo} />
  
      </main>
      <Footer />
    </>
  );
}
