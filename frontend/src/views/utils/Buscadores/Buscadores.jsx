import React, { useState } from "react";
import "./Buscadores.css";

export const Buscadores = ({ onBuscar, onRestaurar }) => {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  // Función para manejar el cambio en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "busqueda") setBusqueda(value);
    if (name === "estado") setEstado(value);
    if (name === "fecha") setFecha(value);
  };

  // Función para limpiar los campos
  const handleBorrar = () => {
    setBusqueda("");
    setEstado("");
    setFecha("");
    if (onBuscar) onBuscar({ busqueda: "", estado: "", fecha: "" });
  };

  // Función para restaurar la búsqueda
  const handleRestaurar = () => {
    if (onRestaurar) onRestaurar();
  };

  // Función para ejecutar la búsqueda
  const handleBuscar = () => {
    if (onBuscar) onBuscar({ busqueda, estado, fecha });
  };

  return (
    <div className="busqueda-container">
      <input
        type="text"
        name="busqueda"
        placeholder="Buscar..."
        value={busqueda}
        onChange={handleInputChange}
      />
      <select name="estado" value={estado} onChange={handleInputChange}>
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <input
        type="date"
        name="fecha"
        value={fecha}
        onChange={handleInputChange}
      />
      <div className="busqueda-botones">
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleBorrar}>Borrar</button>
        <button onClick={handleRestaurar}>Restaurar</button>
      </div>
    </div>
  );
};
