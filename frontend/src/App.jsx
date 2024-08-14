import "./App.css";

export function App() {
  return (
    <>
      <header className="header">
        
      </header>
      <main className="board">
        <aside>
          <section>
            <form action="" className="m_s_a">
              <div className="m_form_hoja_ingreso">
                <label htmlFor=""> Nombres </label>
                <input type="text" placeholder="Ingrese sus nombre" />
                <label htmlFor=""> Apellido </label>
                <input type="text" placeholder="Ingrese sus apellidos" />
                <label htmlFor=""> Edad </label>
                <input type="number" placeholder="Ingrese su edad" />
                <label htmlFor=""> Fecha de nacimiento </label>
                <input type="date" placeholder="DD-MM-AAAA" />
                <label htmlFor=""> Lugar de nacimiento </label>
                <input
                  type="varchar"
                  placeholder="Ingrese su lugar de hacimiento"
                />
                <label htmlFor=""> Diagnostico </label>
                <input type="varchar" placeholder="Ingrese texto" />
                <label htmlFor=""> Se encuentra escolarizado </label>
                <input type="varchar" placeholder="Ingrese texto" />
                <label htmlFor=""> Nombre de la institución </label>
                <label htmlFor=""> Jornada</label>
                <select>
                  <option>Tarde</option>
                  <option>Mañana</option>
                  <option>Noche</option>
                </select>
                <label htmlFor=""> Curso </label>
                <input type="varchar" placeholder="Ingrese el curso" />
                <label htmlFor=""> EPS </label>
                <input type="varchar" />
                <label htmlFor=""> Se encuentra en terapias</label>
                <select>
                  <option>Si</option>
                  <option>No</option>
                </select>
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
