
import "./Login.css";


export function Login() {

  return (
    <>
      <div className="login-container">
        <img className="logo" src="./icon.png" alt="logo" />
        <br />
        <h2>Ingreso</h2>
        <form className="form-login">
          <div className="cajita1">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name="correo"
              id="username"
              placeholder="Ingrese su correo"
              required
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              id="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button className="submit" type="submit">
            Login
          </button>
        </form>
        <br></br>
        <div className="register-link">
          <p>
            ¿No tienes usuario? <a href="./Register">Regístrate</a>
          </p>
        </div>
      </div>
    </>
  );
}
