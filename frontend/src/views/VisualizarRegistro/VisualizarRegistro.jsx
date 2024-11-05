import React from 'react';
import './VisualizarRegistro.css'; // Importa los estilos

export const VisualizarRegistro = ({ data }) => {
    return (
        <div className="registro-container">
            <h2 className="registro-title">Información del Beneficiario</h2>
            <div className="registro-item">
                <strong>Nombre:</strong> {data?.nombre || 'N/A'}
            </div>
            <div className="registro-item">
                <strong>Edad:</strong> {data?.edad || 'N/A'}
            </div>
            <div className="registro-item">
                <strong>Diagnóstico:</strong> {data?.diagnostico || 'N/A'}
            </div>
            {/* Agrega más campos según sea necesario */}
        </div>
    );
};


