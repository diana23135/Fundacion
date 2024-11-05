import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  FaUsers,
  FaUserCheck,
  FaClock,
  FaUserTimes,
  FaPlus

} from "react-icons/fa"; 
import "./Contadores.css";

export const Contadores = ({contadores}) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const contadoresData = contadores.reduce((acc, elemento) => {
    const estado_str = elemento.nombre;
    if (estado_str) {
        switch (estado_str) {
            case "Activo":
                acc[1].numero += 1;
                break;
            case "En espera":
                acc[2].numero += 1;
                break;
            case "Retirado":
                acc[3].numero += 1;
                break;
            default:
                break;
        }
    }

    // Incrementa el total de beneficiarios en el primer objeto
    acc[0].numero += 1;

    return acc;
}, [
    {
        icon: <FaUsers size={30} color="#007bff" />,
        titulo: "Total de Beneficiarios",
        numero: 0,
    },
    {
        icon: <FaUserCheck size={30} color="#28a745" />,
        titulo: "Activos",
        numero: 0,
    },
    {
        icon: <FaClock size={30} color="#ffc107" />,
        titulo: "En espera",
        numero: 0,
    },
    {
        icon: <FaUserTimes size={30} color="#dc3545" />,
        titulo: "Retirados",
        numero: 0,
    },
]);
  

  return (
    <section className="contadores-descargar">
      <div className="contadores">
        {contadoresData.map((contador, index) => (
          <div className="contador" key={index}>
            {contador.icon}
            <div className="contador-texto">
              <h3>{contador.titulo}</h3>
              <p className="numero">{contador.numero}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="crear-beneficiario"
        onClick={() => navigate('/formulario')} // Cambia '/formulario' a la ruta que tengas configurada para el formulario
      >
        <FaPlus size={20} color="#ffffff" /> Crear beneficiario
      </button>
    </section>
  );
};
