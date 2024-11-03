import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Sección de Enlaces Legales */}
        <div className="footer-section">
          <h3>Soporte</h3>
          <ul>
            <li>
              <FaFileAlt /> <a href="#privacy-policy">Política de Privacidad</a>
            </li>
            <li>
              <FaQuestionCircle /> <a href="#support">Soporte</a>
            </li>
            <li>
              <FaQuestionCircle /> <a href="#faq">Preguntas Frecuentes (FAQ)</a>
            </li>
          </ul>
        </div>

        {/* Sección de Información de Contacto */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <ul>
            <li>
              <FaEnvelope />{" "}
              <a href="mailto:Ejemplo@gmail.com">
                Ejemplo@gmail.com
              </a>
            </li>
            <li>
              <FaEnvelope />{" "}
              <a href="mailto:Soporte@gmail.com">
                Soporte@gmail.com
              </a>
            </li>
            <li>
              <FaEnvelope />{" "}
              <a href="mailto:generancia@gmail.com">
                generancia@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales y Promociones */}
        <div className="footer-section">
          <h3>Síguenos en Redes Sociales</h3>
          <p>Síguenos para recibir las últimas promociones y novedades:</p>
          <ul className="social-icons">
            <li>
              <a href="#">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#">
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

