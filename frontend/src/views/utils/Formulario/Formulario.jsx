import { useState } from "react";
import "./Formulario.css";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
export function Formulario({ formulario }) {
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { id, value, type, checked, files } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = new FormData();

    Object.keys(formValues).forEach((key) => {
      dataToSend.append(key, formValues[key]);
    });

    fetch("/paciente", {
      method: "POST",
      body: dataToSend,
    })
      .then((response) => response.json())
      .then((data) => navigate('/inicio'))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Nav />
      <form className="form" onSubmit={handleSubmit}>
        <div className="img-little">
          <h3 className="titulo">FUNDACIÓN MONSEÑOR VALENZUELA BALÉN PARA NIÑOS DESAMPARADOS</h3>
          <img className="icono-form" src="./formularios.png" alt="Formulario" />
        </div>
        <br />
        {formulario ? (
          Object.keys(formulario).map((sectionKey) => {
            const section = formulario[sectionKey];

            return (
              <fieldset key={sectionKey}>
                <legend>{sectionKey}</legend>
                <div className="column-container">
                  {Object.keys(section).map((key) => {
                    const { label, type, placeholder, id, options } = section[key];
                    
                    return (
                      <div className="input-box" key={id}>
                        <label htmlFor={id}>{label}</label>
                        {type === "select" ? (
                          <select id={id} onChange={handleChange} value={formValues[id] || ""} required>
                            <option value="">Seleccione una opción</option>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            required={type !== "checkbox" && type !== "file"}
                            onChange={handleChange}
                            value={type !== "file" ? formValues[id] || "" : undefined}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            );
          })
        ) : (
          <p>No se ha podido cargar el formulario</p>
        )}
        <button className="button" type="submit">
          Enviar
        </button>
      </form>
      <Footer />
    </>
  );
}
