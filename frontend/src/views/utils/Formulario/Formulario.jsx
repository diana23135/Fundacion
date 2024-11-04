import { useState } from "react";
import "./Formulario.css";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";

export function Formulario({ formulario }) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
       
    fetch("/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido para JSON
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
       
  };

  return (
    <>
    <Nav />
      
      <form className="form" onSubmit={handleSubmit}>
      <div className="img-little">
      <h3 className="titulo">FUNDACIÓN MONSEÑOR VALENZUELA BALÉN PARA NIÑOS DESAMPARADOS</h3>
      <img className="icono-form" src="./formularios.png"></img>
      </div>
      <br></br>
        {formulario ? (
          Object.keys(formulario).map((sectionKey) => {
            const section = formulario[sectionKey];

            return (
              <fieldset key={sectionKey}>
                <legend>{sectionKey}</legend>
                <div className="column-container">
                  {Object.keys(section).map((key) => {
                    const { label, type, placeholder, id } = section[key];
                    return (
                      <div className="input-box" key={id}>
                        <label htmlFor={id}>{label}</label>
                        <input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          required={type !== "checkbox"}
                          onChange={handleChange}
                          value={formValues[id] || ""}
                        />
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
