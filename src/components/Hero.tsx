import { Link } from "react-router-dom";
import "./Hero.css";

interface RealmStat {
  label: string;
  value: string;
}

const realmStats: RealmStat[] = [
  { label: "Realmlist", value: "173.212.204.29" },
  { label: "Tasa de profesiones", value: "x3" },
  { label: "Tasa de experiencia", value: "x3" },
  { label: "Parche", value: "3.3.5a" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__main">
        <h1 className="hero__title">
          <span className="hero__title-line">Un reino congelado</span>
          <span className="hero__title-line hero__title-line--accent">
            espera ser conquistado
          </span>
        </h1>
        <p className="hero__lede">
          Afterlife es un servidor privado de World of Warcraft: Wrath of the
          Lich King, corriendo en AzerothCore.
        </p>
        <div className="hero__actions">
          <Link className="hero__cta hero__cta--primary" to="/registro">
            Crear cuenta
          </Link>

        </div>
      </div>

      <aside className="hero__panel" aria-label="Estado del reino">
        <h2 className="hero__panel-title">Estado del reino</h2>
        <dl className="hero__panel-list">
          {realmStats.map((stat) => (
            <div className="hero__panel-row" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="hero__panel-note">
          <span className="hero__panel-dot" />
          Servidor en línea
        </p>
      </aside>
    </section>
  );
}