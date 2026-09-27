import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = "https://installed-praise-laws-horizon.trycloudflare.com";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Usuario o contraseña incorrectos.");
      }

      const data = await response.json();

      // Ajusta esto según lo que devuelva tu backend (token JWT, etc.)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login">
      <div className="login__panel">
        <h1 className="login__title">Iniciar sesión</h1>
        <p className="login__lede">
          Entra a tu cuenta para continuar tu aventura en Afterlife.
        </p>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label className="login__label" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              className="login__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login__error">{error}</p>}

          <button className="login__submit" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="login__footer">
          ¿No tienes cuenta?{" "}
          <Link className="login__link" to="/registro">
            Crear cuenta
          </Link>
        </p>
      </div>
    </section>
  );
}