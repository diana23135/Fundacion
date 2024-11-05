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
  const [filtros, setFiltros] = useState({});
  const [aplicarFiltro, setAplicarFiltro] = useState(false);
  const filasPorPagina = 5;
  const navigate = useNavigate();
  let cabeceras = [];
if(datos && datos.length > 0){
  const cabeceras = Object.keys(datos[0]);
}


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

  const getInputField = (columna) => {
    const sampleValue = datos[0][columna];
    if (typeof sampleValue === "number") {
      return (
        <input
          type="number"
          placeholder={`Filtrar por ${columna}`}
          value={filtros[columna] || ""}
          onChange={(e) => handleFilterChange(e, columna)}
        />
      );
    } else if (
      typeof sampleValue === "string" &&
      sampleValue.match(/^\d{4}-\d{2}-\d{2}/)
    ) {
      return (
        <input
          type="date"
          value={filtros[columna] || ""}
          onChange={(e) => handleFilterChange(e, columna)}
        />
      );
    } else if (typeof sampleValue === "string") {
      return (
        <input
          type="text"
          placeholder={`Filtrar por ${columna}`}
          value={filtros[columna] || ""}
          onChange={(e) => handleFilterChange(e, columna)}
        />
      );
    }
    return (
      <input
        type="text"
        placeholder={`Filtrar por ${columna}`}
        value={filtros[columna] || ""}
        onChange={(e) => handleFilterChange(e, columna)}
      />
    );
  };

  return (
    <>
      {(datos || datos.length >0) && (
  <div className="contenedor">
    <h1>{titulo}</h1>
    <div className="filtros">
      {cabeceras.map((columna, index) => (
        <div key={index} className="filtro">
          <label>{columna}</label>
          {getInputField(columna)}
        </div>
      ))}
      <div className="btn-filtros">
        <button onClick={aplicarFiltros} className="btn">
          Buscar
        </button>
        <button onClick={borrarFiltros} className="btn">
          Reestablecer
        </button>
      </div>
    </div>
  </div>
)}

        <div className="cont-crear-descargar">
          <Contadores contadores={contadores} />
          <button onClick={handleDownload} className="btn-descargar">
            <SiMicrosoftexcel className="excel-icon" /> Descargar
          </button>
          <button
            className="crear-beneficiario"
            onClick={() => navigate("/formulario")} // Cambia '/formulario' a la ruta que tengas configurada para el formulario
          >
            <FaPlus className="FaPlus-icon" size={20} color="#ffffff" /> Crear
          </button>
        </div>

        {!datos || datos.length === 0 ? (
  <p>No hay datos disponibles para mostrar.</p>
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
              <BotonAcciones />
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
)}

      
    </>
  );
};
