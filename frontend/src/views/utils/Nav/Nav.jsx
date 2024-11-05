import { useEffect, useState } from "react";
import "./Nav.css";
import { FaUser, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";

export function Nav() {
  const [scrolling, setScrolling] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (window.scrollY > 0) {
        setScrolling(true);
        setIsScrolling(true);

        const newTimeout = setTimeout(() => {
          if (!isHovered) {
            setScrolling(false);
            setIsScrolling(false);
          }
        }, 500);

        setScrollTimeout(newTimeout);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, isHovered]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión aquí
    console.log("Cerrar sesión");
    setIsMenuOpen(false); // Cerrar el menú después de cerrar sesión
  };

  return (
    <nav
      className={`navbar fixed-top ${scrolling ? "" : "hidden"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="contenedor-nav">
        <div className="logo-container">
          <img src="./icon.png" alt="Logo" className="logo-Blanco" />
          <a className="navbar-texto" href="/">
            Fundación Monseñor Valenzuela Balén
          </a>
        </div>
        <div className="botones-nav">
          <ul className="nav-links">
            <li>
              <a href="/inicio" className="nav-button">
                <FaUser /> Beneficiarios
              </a>
            </li>
            <li>
              <a href="/historias" className="nav-button">
                <FaInfoCircle /> Historias clínicas
              </a>
            </li>
            <li>
              <button className="nav-button" onClick={toggleMenu}>
                <FaUser /> Usuario
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Cerrar Sesión
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
