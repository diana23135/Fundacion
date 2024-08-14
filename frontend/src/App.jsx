import "./App.css";

export function App() {
  return (
    <>
      <header className="header"></header>
      <main className="board">
        <aside>
          <section className="section-form">
            <header>Formulario</header>
            <form action="" className="form">
              <div className="column">
                <div className="input-box">
                  <label htmlFor="nombre">Nombres</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Ingrese sus nombres" required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    id="apellido"
                    type="text"
                    placeholder="Ingrese su apellido" required
                  />
                </div>
              </div>

              <div className="column">
                <div className="input-box">
                  <label htmlFor="edad">Edad</label>
                  <input
                    id="edad"
                    type="number"
                    placeholder="Ingrese su edad" required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
                  <input id="fecha-nacimiento" type="date" required />
                </div>
                <div className="input-box">
                  <label htmlFor="lugar-nacimiento">Lugar de nacimiento</label>
                  <input
                    id="lugar-nacimiento"
                    type="text"
                    placeholder="Ingrese su lugar de nacimiento" required
                  />
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="diagnostico">Diagnóstico</label>
                <input
                  id="diagnostico"
                  type="text"
                  placeholder="Ingrese diagnóstico" required
                />
              </div>
              <div className="column">
                <div className="input-box">
                  <label htmlFor="escolarizado">
                    ¿Se encuentra escolarizado?
                  </label>
                  <input
                    id="escolarizado"
                    type="text"
                    placeholder="Ingrese texto" required
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="institucion">Nombre de la institución</label>
                  <input
                    id="institucion"
                    type="text"
                    placeholder="Ingrese nombre de la institución" required
                  />
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label htmlFor="jornada">Jornada</label>
                  <select id="jornada" required>
                    <option>Tarde</option>
                    <option>Mañana</option>
                    <option>Noche</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="curso">Curso</label>
                  <input
                    id="curso"
                    type="text" required
                    placeholder="Ingrese el curso"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="eps">EPS</label>
                  <input id="eps" type="text"  required/>
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label htmlFor="terapias">¿Se encuentra en terapias?</label>
                  <select id="terapias" required>
                    <option>Si</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="terapias">¿Donde?</label>
                  <input id="lugar-terapias" type="text" required />
                </div>
              </div>

              <button className="button">Enviar</button>
            </form>
          </section>
        </aside>
      </main>
      <footer></footer>
    </>
  );
}
