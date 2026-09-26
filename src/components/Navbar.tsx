import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo-afterlife.png";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Reglas del reino", href: "/reglas" },
  { label: "Foro", href: "/foro" },
  { label: "Sobre Nosotros", href: "/aboutus" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/" aria-label="Afterlife, inicio">
        <img className="navbar__logo" src={logo} alt="Afterlife" />
      </Link>

      <nav className="navbar__links" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <Link key={link.href} className="navbar__link" to={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="navbar__actions">
        <Link className="navbar__login" to="/login">
          Iniciar sesión
        </Link>
        <Link className="navbar__cta" to="/registro">
          Crear cuenta
        </Link>
      </div>
    </header>
  );
}