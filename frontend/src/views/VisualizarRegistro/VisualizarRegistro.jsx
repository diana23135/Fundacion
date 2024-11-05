import './VisualizarRegistro.css';

export const VisualizarRegistro = ({ pacienteData }) => {
    const {  paciente, estado, usuario, acudientes, files } = pacienteData;

    return (
        paciente ? (
            <div className="paciente-card">
                <header className="paciente-header">
                    <img 
                        src={files[0]?.archivo_adjunto || 'https://via.placeholder.com/150'} 
                        alt={`Foto de ${paciente.nombre}`} 
                        className="paciente-image" 
                    />
                    <div className="paciente-info">
                        <h2>{paciente.nombre} {paciente.apellido}</h2>
                        <p><strong>ID:</strong> {paciente.id_paciente}</p>
                        <p><strong>Edad:</strong> {paciente.edad >= 0 ? paciente.edad : 'No especificada'}</p>
                        <p><strong>Sexo:</strong> {paciente.sexo}</p>
                        <p><strong>Teléfono Celular:</strong> {paciente.tel_celular}</p>
                        <p><strong>Teléfono Fijo:</strong> {paciente.tel_fijo}</p>
                        <p><strong>Estado:</strong> {estado.nombre} - {estado.descripcion}</p>
                    </div>
                </header>
                
                <section className="paciente-details">
                    <h3>Detalles del Paciente</h3>
                    <p><strong>Tipo de Identificación:</strong> {paciente.tipo_identificacion}</p>
                    <p><strong>Número de Identidad:</strong> {paciente.num_identidad}</p>
                    <p><strong>Dirección:</strong> {paciente.direccion}</p>
                    <p><strong>Barrio:</strong> {paciente.barrio}</p>
                    <p><strong>Lugar de Nacimiento:</strong> {paciente.lugar_nacimiento}</p>
                    <p><strong>Institución:</strong> {paciente.nom_institucion}</p>
                    <p><strong>EPS:</strong> {paciente.eps}</p>
                    <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                    <p><strong>Áreas de Interés:</strong> {paciente.areas_interes}</p>
                    <p><strong>Utiliza Pañal:</strong> {paciente.util_panial ? 'Sí' : 'No'}</p>
                    <p><strong>Jornada:</strong> {paciente.jornada}</p>
                    <p><strong>Curso:</strong> {paciente.curso}</p>
                    <p><strong>Terapeuta:</strong> {paciente.terapias}</p>
                    <p><strong>Observaciones y Expectativas:</strong> {paciente.obs_expectativas}</p>
                </section>
                
                <section className="paciente-docs">
                    <h3>Documentos del Paciente</h3>
                    {files.length > 0 ? (
                        files.map((file) => (
                            <div key={file.id_documento} className="document-item">
                                <p><strong>Tipo de Documento:</strong> {file.tipo_documento}</p>
                                <p><strong>Fecha de Inserción:</strong> {new Date(file.fecha_insercion).toLocaleDateString()}</p>
                                <p><strong>Vigencia:</strong> {new Date(file.vigencia).toLocaleDateString()}</p>
                                <p><strong>Archivo Adjunto:</strong> {file.archivo_adjunto}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay documentos disponibles para este paciente.</p>
                    )}
                </section>

                <section className="paciente-acudientes">
                    <h3>Acudientes</h3>
                    {acudientes.length > 0 ? (
                        acudientes.map((acudiente, index) => (
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
                    <p><strong>ID de Usuario:</strong> {usuario.id_usuario}</p>
                    <p><strong>Estado:</strong> {usuario.fk_estado === 1 ? 'Activo' : 'Inactivo'}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(usuario.createdAt).toLocaleDateString()}</p>
                    <p><strong>Última Actualización:</strong> {new Date(usuario.updatedAt).toLocaleDateString()}</p>
                </section>

                <section className="paciente-estado">
                    <h3>Estado del Paciente</h3>
                    <p><strong>Nombre:</strong> {estado.nombre}</p>
                    <p><strong>Descripción:</strong> {estado.descripcion}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(estado.createdAt).toLocaleDateString()}</p>
                    <p><strong>Última Actualización:</strong> {new Date(estado.updatedAt).toLocaleDateString()}</p>
                </section>
            </div>
        ) : (
            <div>No se han podido cargar los datos</div>
        )
    );
}