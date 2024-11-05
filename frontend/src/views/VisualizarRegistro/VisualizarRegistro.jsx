import { Footer } from "../utils/Footer/Footer";
import { Nav } from "../utils/Nav/Nav";
import "./VisualizarRegistro.css";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const VisualizarRegistro = () => {
    const [pacienteData, setData] = useState({
        paciente: {},
        estado: {},
        files: [],
        acudientes: [],
        usuario: {},
    });
    const [base64Image, setBase64Image] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    
    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    useEffect(() => {
        const queryParams = getQueryParams();
        const param = queryParams.get('numero_id');

        if (!param) {
            setError("Número de ID no especificado en la URL.");
            setLoading(false);
            return;
        }

        fetch(`/paciente?id=${param}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud al servidor');
            }
            return response.json();
        })
        .then((response) => {
            setData(response.data[0]);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [location.search]);

    const formatDate = (date) => new Date(date).toLocaleDateString();

    useEffect(() => {
        if (pacienteData.files?.[0]?.base64 && pacienteData.files[0].tipo_documento === "foto de perfil") {
            setBase64Image(`data:image/jpeg;base64,${pacienteData.files[0].base64}`);
        } else {
            setBase64Image(null);
        }
    }, [pacienteData.files]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file);
        }
    };

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Nav />
            {pacienteData.paciente ? (
                <div className="paciente-card">
                    <header className="paciente-header">
                        {base64Image && (
                            <img
                                src={base64Image}
                                alt={`Imagen convertida de Base64 de ${pacienteData.paciente.nombre}`}
                                className="paciente-image"
                            />
                        )}
                        <div className="paciente-info">
                            <h2>{pacienteData.paciente.nombre} {pacienteData.paciente.apellido}</h2>
                            <p><strong>ID:</strong> {pacienteData.paciente.id_paciente}</p>
                            <p><strong>Edad:</strong> {pacienteData.paciente.edad >= 0 ? pacienteData.paciente.edad : "No especificada"}</p>
                            <p><strong>Sexo:</strong> {pacienteData.paciente.sexo}</p>
                            <p><strong>Teléfono Celular:</strong> {pacienteData.paciente.tel_celular}</p>
                            <p><strong>Teléfono Fijo:</strong> {pacienteData.paciente.tel_fijo}</p>
                            <p><strong>Estado:</strong> {pacienteData.estado.nombre} - {pacienteData.estado.descripcion}</p>
                        </div>
                    </header>

                    <section className="paciente-details">
                        <h3>Detalles del Paciente</h3>
                        <p><strong>Tipo de Identificación:</strong> {pacienteData.paciente.tipo_identificacion}</p>
                        <p><strong>Número de Identidad:</strong> {pacienteData.paciente.num_identidad}</p>
                        <p><strong>Dirección:</strong> {pacienteData.paciente.direccion}</p>
                        <p><strong>Barrio:</strong> {pacienteData.paciente.barrio}</p>
                        <p><strong>Lugar de Nacimiento:</strong> {pacienteData.paciente.lugar_nacimiento}</p>
                        <p><strong>Institución:</strong> {pacienteData.paciente.nom_institucion}</p>
                        <p><strong>EPS:</strong> {pacienteData.paciente.eps}</p>
                        <p><strong>Diagnóstico:</strong> {pacienteData.paciente.diagnostico}</p>
                        <p><strong>Áreas de Interés:</strong> {pacienteData.paciente.areas_interes}</p>
                        <p><strong>Utiliza Pañal:</strong> {pacienteData.paciente.util_panial ? "Sí" : "No"}</p>
                        <p><strong>Jornada:</strong> {pacienteData.paciente.jornada}</p>
                        <p><strong>Curso:</strong> {pacienteData.paciente.curso}</p>
                        <p><strong>Terapeuta:</strong> {pacienteData.paciente.terapias}</p>
                        <p><strong>Observaciones y Expectativas:</strong> {pacienteData.paciente.obs_expectativas}</p>
                    </section>

                    <section className="paciente-docs">
                        <h3>Documentos del Paciente</h3>
                        <input
                            type="file"
                            className="btn-general"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput" className="btn-general" aria-label="Agregar Documento">
                            Agregar Documento
                        </label>
                        {pacienteData.files.length > 0 ? (
                            pacienteData.files.map((file) => (
                                <div key={file.id_documento} className="document-item">
                                    <p><strong>Tipo de Documento:</strong> {file.tipo_documento}</p>
                                    <p><strong>Fecha de Inserción:</strong> {formatDate(file.fecha_insercion)}</p>
                                    <p><strong>Vigencia:</strong> {formatDate(file.vigencia)}</p>
                                    <p><strong>Archivo Adjunto:</strong> {file.archivo_adjunto}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay documentos disponibles para este paciente.</p>
                        )}
                    </section>

                    <section className="paciente-acudientes">
                        <h3>Acudientes</h3>
                        {pacienteData.acudientes.length > 0 ? (
                            pacienteData.acudientes.map((acudiente, index) => (
                                <div key={index} className="acudiente-item">
                                    <p><strong>Nombre:</strong> {acudiente.nombre}</p>
                                    <p><strong>Teléfono:</strong> {acudiente.telefono}</p>
                                    <p><strong>Relación:</strong> {acudiente.relacion}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay acudientes registrados para este paciente.</p>
                        )}
                    </section>

                    <section className="paciente-usuario">
                        <h3>Información del Usuario</h3>
                        <p><strong>ID de Usuario:</strong> {pacienteData.usuario.id_usuario}</p>
                        <p><strong>Estado:</strong> {pacienteData.usuario.fk_estado === 1 ? "Activo" : "Inactivo"}</p>
                        <p><strong>Fecha de Creación:</strong> {formatDate(pacienteData.usuario.createdAt)}</p>
                        <p><strong>Última Actualización:</strong> {formatDate(pacienteData.usuario.updatedAt)}</p>
                    </section>

                    <section className="paciente-estado">
                        <h3>Estado del Paciente</h3>
                        <p><strong>Nombre:</strong> {pacienteData.estado.nombre}</p>
                        <p><strong>Descripción:</strong> {pacienteData.estado.descripcion}</p>
                        <p><strong>Fecha de Creación:</strong> {formatDate(pacienteData.estado.createdAt)}</p>
                        <p><strong>Última Actualización:</strong> {formatDate(pacienteData.estado.updatedAt)}</p>
                    </section>
                </div>
            ) : (
                <div>No se han podido cargar los datos</div>
            )}
            <Footer />
        </>
    );
};
