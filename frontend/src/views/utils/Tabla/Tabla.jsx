import React, { useState } from "react";
import "./Tabla.css";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import { BotonAcciones } from "../BotonAcciones/BotonAcciones";

export const Tabla = ({ datos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [aplicarFiltro, setAplicarFiltro] = useState(false);
  const filasPorPagina = 5;
  console.log(datos);
  (datos);
  // Comprobación para evitar errores si 'datos' está vacío
  if (datos && datos.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  const cabeceras = Object.keys(datos[0]);

  // Cambiar el valor de los filtros en el estado
  const handleFilterChange = (e, columna) => {
    setFiltros({
      ...filtros,
      [columna]: e.target.value,
    });
  };

  // Ejecutar filtro solo cuando se presiona el botón "Buscar"
  const aplicarFiltros = () => {
    setAplicarFiltro(true);
    setPaginaActual(1); // Reiniciar a la primera página
  };

  // Borrar filtros
  const borrarFiltros = () => {
    setFiltros({});
    setAplicarFiltro(false);
    setPaginaActual(1);
  };

  const datosFiltrados = aplicarFiltro
    ? datos.filter((fila) =>
        cabeceras.every((columna) => {
          if (!filtros[columna]) return true;
          return fila[columna]
            ?.toString()
            .toLowerCase()
            .includes(filtros[columna].toLowerCase());
        })
      )
    : datos;

  const indiceUltimaFila = paginaActual * filasPorPagina;
  const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
  const filasActuales = datosFiltrados.slice(indicePrimeraFila, indiceUltimaFila);
  const numeroTotalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= numeroTotalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };




    // Función para manejar la descarga
    const handleDownload = (event) => {
      event.preventDefault();
  
      if (datos) {
          // Crea una hoja de cálculo a partir de los datos
          const worksheet = XLSX.utils.json_to_sheet(datos);
  
          // Crea un libro de trabajo y agrega la hoja de cálculo
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
  
          // Genera un archivo Excel y crea un Blob
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
          // Crea un enlace temporal para la descarga
          const url = URL.createObjectURL(blob);
  
          // Crea un elemento <a> y lo configura para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.download = 'registros.xlsx'; // Nombre del archivo
          link.click();
  
          // Libera la URL Blob para evitar fugas de memoria
          URL.revokeObjectURL(url);
      }};

 




  return (
    <>
      <button onClick={handleDownload}>Descargar Registros</button>

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
                <BotonAcciones />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaActual} de {numeroTotalPaginas}
        </span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === numeroTotalPaginas}>
          Siguiente
        </button>
      </div>
    </>
  );
};
