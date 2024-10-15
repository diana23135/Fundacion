import React from "react";
import {
  FaUsers,
  FaUserCheck,
  FaClock,
  FaUserTimes,
  FaPlus,
} from "react-icons/fa"; // Asegúrate de importar FaPlus si lo vas a usar
import "./Contadores.css";

export const Contadores = () => {
  const contadoresData = [
    {
      icon: <FaUsers size={30} color="#007bff" />,
      titulo: "Total de Beneficiarios",
      numero: 500,
    },
    {
      icon: <FaUserCheck size={30} color="#28a745" />,
      titulo: "Activos",
      numero: 300,
    },
    {
      icon: <FaClock size={30} color="#ffc107" />,
      titulo: "En espera",
      numero: 100,
    },
    {
      icon: <FaUserTimes size={30} color="#dc3545" />,
      titulo: "Retirados",
      numero: 100,
    },
  ];

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
      <button className="crear-beneficiario">
        <FaPlus size={20} color="#ffffff" /> Crear beneficiario
      </button>
    </section>
  );
};
