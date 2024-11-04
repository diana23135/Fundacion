import React from "react";
import "./VisualizarRegistro.css";

export const VisualizarRegistro = ({ registro }) => {
  if (!registro) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  return (
    <div className="visualizar-container">
      <h2 className="titulo-reg">Información del Beneficiario</h2>
      <p>
        <strong>Fecha de Diligenciamiento:</strong>{" "}
        {registro.fecha_diligenciamiento}
      </p>

      <div className="columna">
        <h3>Información Personal</h3>
        <div className="columna-1">
          <div>
            <p>
              <strong>Nombre:</strong> {registro.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {registro.apellido}
            </p>
            <p>
              <strong>Edad:</strong> {registro.edad}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong> {registro.fecha_nacimiento}
            </p>
            <p>
              <strong>Lugar de Nacimiento:</strong> {registro.lugar_nacimiento}
            </p>
          </div>
          <div className="foto-container">
            <img
              src={registro.foto}
              alt="Foto del beneficiario"
              className="foto"
            />
          </div>
        </div>
      </div>

      <div className="columna">
        <h3>Diagnóstico y Escolarización</h3>
        <p>
          <strong>Diagnóstico:</strong> {registro.diagnostico}
        </p>
        <p>
          <strong>Escolarizado:</strong> {registro.escolarizado ? "Sí" : "No"}
        </p>
        {registro.escolarizado && (
          <>
            <p>
              <strong>Institución:</strong> {registro.institucion}
            </p>
            <p>
              <strong>Jornada:</strong> {registro.jornada}
            </p>
            <p>
              <strong>Curso:</strong> {registro.curso}
            </p>
          </>
        )}
        <p>
          <strong>EPS:</strong> {registro.eps}
        </p>
        <p>
          <strong>En Terapias:</strong> {registro.terapias ? "Sí" : "No"}
        </p>
        {registro.terapias && (
          <p>
            <strong>¿Dónde?:</strong> {registro.donde}
          </p>
        )}
      </div>

      <div className="columna">
        <h3>Datos del Cuidador 1</h3>
        <p>
          <strong>Nombre:</strong> {registro.cuidador1_nombre}
        </p>
        <p>
          <strong>Edad:</strong> {registro.cuidador1_edad}
        </p>
        <p>
          <strong>Documento de Identidad:</strong>{" "}
          {registro.identificacion_cuidador1}
        </p>
        <p>
          <strong>Ocupación:</strong> {registro.ocupacion_cuidador1}
        </p>
      </div>

      <div className="columna">
        <h3>Datos del Cuidador 2</h3>
        <p>
          <strong>Nombre:</strong> {registro.cuidador2_nombre}
        </p>
        <p>
          <strong>Edad:</strong> {registro.cuidador2_edad}
        </p>
        <p>
          <strong>Documento de Identidad:</strong>{" "}
          {registro.identificacion_cuidador2}
        </p>
        <p>
          <strong>Ocupación:</strong> {registro.ocupacion_cuidador2}
        </p>
      </div>

      <div className="columna">
        <h3>Datos de Contacto</h3>
        <p>
          <strong>Barrio:</strong> {registro.barrio}
        </p>
        <p>
          <strong>Dirección:</strong> {registro.direccion}
        </p>
        <p>
          <strong>Teléfono Fijo:</strong> {registro.telefono_fijo}
        </p>
        <p>
          <strong>Teléfono Celular:</strong> {registro.telefono_celular}
        </p>
      </div>
    </div>
  );
};
