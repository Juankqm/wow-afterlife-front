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
      <a className="navbar__brand" href="/" aria-label="Afterlife, inicio">
        <img className="navbar__logo" src={logo} alt="Afterlife" />
      </a>

      <nav className="navbar__links" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <a key={link.href} className="navbar__link" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        <a className="navbar__login" href="/login">
          Iniciar sesión
        </a>
        <a className="navbar__cta" href="/registro">
          Crear cuenta
        </a>
      </div>
    </header>
  );
}