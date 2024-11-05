import { useState } from "react";
import "./Formulario.css";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

export function Formulario({ formulario }) {
  const [formValues, setFormValues] = useState({});
  
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const { id, value, type, checked, files } = event.target;

    // Si el tipo es "file", convierte el archivo a Base64
    if (type === "file" && files[0]) {
      const file = files[0];
      const base64 = await convertFileToBase64(file);
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: base64,
        [`${id}_filename`]: file.name,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: type === "checkbox" ? checked : value,
        
      }));
    }
  };

  // Función para convertir un archivo a Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = { ...formValues };
  
    // Verificar el tamaño de los datos
    console.log("Tamaño de los datos a enviar:", JSON.stringify(dataToSend));
  
    
    

  


    fetch("/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
        return response.json();
      })
      .then(() => navigate("/inicio"))
      .catch((error) => console.log(error));
  };
  

  return (
    <>
      <Nav />
      <form className="form" onSubmit={handleSubmit}>
        <div className="img-little">
          <h3 className="titulo">
            FUNDACIÓN MONSEÑOR VALENZUELA BALÉN PARA NIÑOS DESAMPARADOS
          </h3>
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
