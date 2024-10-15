import { Link} from "react-router-dom";
import "./Register.css";


export function Register() {

  return (
    <div className="login-container">
      <img className="logo" src="./icon.png"></img>
      <br></br>
      <h2>Registro</h2>
      <form>
        <div className="cajita1">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            name="nombreUsuario"
            type="text"
            id="username"
            placeholder="Ingrese su nombre de usuario"
          />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            name="correo"
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            name="contraseña"
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
          />

          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            placeholder="Confirme su contraseña"
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
