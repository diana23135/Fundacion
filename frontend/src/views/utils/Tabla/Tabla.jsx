import { useState } from "react";
import "./Tabla.css";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import { BotonAcciones } from "../BotonAcciones/BotonAcciones";
import { FaPlus } from "react-icons/fa";
import { Contadores } from "../Contadores/Contadores";
import { useNavigate } from "react-router-dom";

export const Tabla = ({ datos, contadores, titulo }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [buscar, setBuscar] = useState("");
  const filasPorPagina = 5;
  const navigate = useNavigate();
  let cabeceras = [];

  if (datos && datos.length > 0) {
    cabeceras = Object.keys(datos[0]);
  }

  // Cambiar el valor del campo de búsqueda en el estado
  const handleBuscarChange = (e) => {
    setBuscar(e.target.value);
    setPaginaActual(1); // Reiniciar a la primera página al cambiar el texto de búsqueda
  };

  // Filtrar los datos en base a la búsqueda en todas las columnas
  const datosFiltrados = datos.filter((fila) =>
    cabeceras.some((columna) =>
      fila[columna]?.toString().toLowerCase().includes(buscar.toLowerCase())
    )
  );

  const indiceUltimaFila = paginaActual * filasPorPagina;
  const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
  const filasActuales = datosFiltrados.slice(
    indicePrimeraFila,
    indiceUltimaFila
  );
  const numeroTotalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= numeroTotalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

}
  // Función para manejar la descarga
  const handleDownload = (event) => {
    event.preventDefault();
    const worksheet = XLSX.utils.json_to_sheet(datosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "registros.xlsx"; // Nombre del archivo
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {datos && datos.length > 0 && (
        <div className="contenedor">
          <h1>{titulo}</h1>
          <br />
        </div>
      )}

      <div className="cont-crear-descargar">
        <Contadores contadores={contadores} />
        <div className="filtro">
             
              <input
                type="text"
                placeholder="Buscar registros"
                value={buscar}
                onChange={handleBuscarChange}
              />
            </div>
        <button onClick={handleDownload} className="btn-descargar">
          <SiMicrosoftexcel className="excel-icon" /> Descargar
        </button>
        <button
          className="crear-beneficiario"
          onClick={() => navigate("/formulario")}
        >
          <FaPlus className="FaPlus-icon" size={20} color="#ffffff" /> Crear
        </button>
      </div>

      {!datos || datos.length === 0 ? (
        <p className="contenedor">No hay datos disponibles para mostrar.</p>
      ) : (
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
                    <BotonAcciones data={fila} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginacion">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="btn-general"
            >
              Anterior
            </button>
            <span>
              Página {paginaActual} de {numeroTotalPaginas}
            </span>
            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === numeroTotalPaginas}
              className="btn-general"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </>
  );
};
