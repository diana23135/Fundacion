import React, { useState } from "react";
import "./Tabla.css";
import { BotonAcciones } from "../BotonAcciones/BotonAcciones";

export const Tabla = ({ datos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  // Comprobación para evitar errores si 'datos' está vacío
  if (datos && datos.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  // Calcular los índices para las filas actuales
  const indiceUltimaFila = paginaActual * filasPorPagina;
  const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
  const filasActuales = datos.slice(indicePrimeraFila, indiceUltimaFila);

  // Calcular el número total de páginas
  const numeroTotalPaginas = Math.ceil(datos.length / filasPorPagina);

  // Obtener las cabeceras de la tabla a partir de las claves del primer objeto
  const cabeceras = Object.keys(datos[0]);

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= numeroTotalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  return (
    <>
      <table className="tabla">
        <thead>
          <tr>
            {cabeceras.map((cabecera, index) => (
              <th key={index}>{cabecera}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filasActuales.map((fila, index) => (
            <tr key={index}>
              {cabeceras.map((cabecera) => (
                <td key={cabecera}>{fila[cabecera]}</td>
              ))}
              <td>
                <BotonAcciones/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual} de {numeroTotalPaginas}
        </span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === numeroTotalPaginas}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};
