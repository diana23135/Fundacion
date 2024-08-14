import "./App.css";

export function App() {
  return (
    <>
      <header className="header">
        
      </header>
      <main className="board">
        <aside>
          <section className="m_s_a">
            <h1>Formulario</h1>
            <form action="" className="form-inscription" >
           
              <div className="m_form_hoja_ingreso">
                <div className="form-group name">
                  <label htmlFor="nombre">Nombres</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Ingrese sus nombres"
                  />
                </div>
                <div className="form-group last-name">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    id="apellido"
                    type="text"
                    placeholder="Ingrese su apellido"
                  />
                </div>
                <div className="form-group age">
                  <label htmlFor="edad">Edad</label>
                  <input
                    id="edad"
                    type="number"
                    placeholder="Ingrese su edad"
                  />
                </div>
                <div className="form-group born-age">
                  <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
                  <input id="fecha-nacimiento" type="date" />
                </div>
                <div className="form-group cityborn">
                  <label htmlFor="lugar-nacimiento">Lugar de nacimiento</label>
                  <input
                    id="lugar-nacimiento"
                    type="text"
                    placeholder="Ingrese su lugar de nacimiento"
                  />
                </div>
                <div className="form-group diagnostic">
                  <label htmlFor="diagnostico">Diagnóstico</label>
                  <input
                    id="diagnostico"
                    type="text"
                    placeholder="Ingrese diagnóstico"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="escolarizado">
                    ¿Se encuentra escolarizado?
                  </label>
                  <input
                    id="escolarizado"
                    type="text"
                    placeholder="Ingrese texto"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="institucion">Nombre de la institución</label>
                  <input
                    id="institucion"
                    type="text"
                    placeholder="Ingrese nombre de la institución"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jornada">Jornada</label>
                  <select id="jornada">
                    <option>Tarde</option>
                    <option>Mañana</option>
                    <option>Noche</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="curso">Curso</label>
                  <input
                    id="curso"
                    type="text"
                    placeholder="Ingrese el curso"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eps">EPS</label>
                  <input id="eps" type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="terapias">¿Se encuentra en terapias?</label>
                  <select id="terapias">
                    <option>Si</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              <button className="main_f_b">Enviar</button>
            </form>
          </section>
        </aside>
      </main>
      <footer></footer>
    </>
  );
}
