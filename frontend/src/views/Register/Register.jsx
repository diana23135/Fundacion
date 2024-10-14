import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useValidation } from "../../hooks/useValidation";

export function Register() {
  const navigate = useNavigate();
  const [form, setFormState] = useState({
    nombreUsuario: "",
    correo: "",
    contraseña: "",
    "confirm-password": "",
  });

  const { errors, validationForm } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const onSubmit = (form) => {
    fetch("http://localhost:3001/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido para JSON
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm(form)) {
      console.log("ff");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="login-container">
      <img className="logo" src="./icon.png"></img>
      <br></br>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="cajita1">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            name="nombreUsuario"
            type="text"
            id="username"
            placeholder="Ingrese su nombre de usuario"
            onChange={handleChange}
          />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            name="correo"
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            name="contraseña"
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
          />

          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            placeholder="Confirme su contraseña"
            onChange={handleChange}
          />
        </div>
        <button className="button-register" type="submit">
          Registrarse
        </button>
        <br></br>
        <br></br>
        <div className="register-link">
          <p>
            ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
