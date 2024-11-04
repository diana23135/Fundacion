import React, { useState, useEffect, useRef } from "react";
import "./BotonAcciones.css";
import { useNavigate } from "react-router-dom";

export const BotonAcciones = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    if (option === "Visualizar") navigate("/VisualizarRegistro");
    setMenuVisible(false); // Ocultar el menú después de seleccionar una opción
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="accion-button-container" ref={menuRef}>
      <button className="accion-button" onClick={toggleMenu}>
        ⋮
      </button>
      {menuVisible && (
        <div className="accion-menu">
          <p onClick={() => handleOptionClick("Visualizar")}>Visualizar</p>
          <p onClick={() => handleOptionClick("Editar")}>Editar</p>
          <p onClick={() => handleOptionClick("Aprobar")}>Aprobar</p>
          <p onClick={() => handleOptionClick("Rechazar")}>Rechazar</p>
          <p onClick={() => handleOptionClick("Inactivar")}>Inactivar</p>
          <p onClick={() => handleOptionClick("Activar")}>Activar</p>
        </div>
      )}
    </div>
  );
};
