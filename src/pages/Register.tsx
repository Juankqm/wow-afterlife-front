import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptsRules: boolean;
}

const initialState: FormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptsRules: false,
};

export default function Register() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "acceptsRules" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.username.trim().length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!form.acceptsRules) {
      setError("Tienes que aceptar las reglas del reino para continuar.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: reemplazar por la llamada real a tu API de registro
      // await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });
      console.log("Registrando", form);
    } catch {
      setError("No se pudo crear la cuenta. Intenta de nuevo en un momento.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="register">
      <div className="register__panel">
        <h1 className="register__title">Crea tu cuenta</h1>
        <p className="register__lede">
          Un usuario y una contraseña — sin correo de verificación, sin
          pagos. Los usarás para el sitio y para entrar al juego.
        </p>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label className="register__field">
            <span className="register__label">Nombre de usuario</span>
            <input
              className="register__input"
              type="text"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange("username")}
            />
          </label>

          <label className="register__field">
            <span className="register__label">Correo electrónico</span>
            <input
              className="register__input"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
            />
          </label>

          <label className="register__field">
            <span className="register__label">Contraseña</span>
            <input
              className="register__input"
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange("password")}
            />
            <span className="register__hint">Mínimo 8 caracteres.</span>
          </label>

          <label className="register__field">
            <span className="register__label">Confirmar contraseña</span>
            <input
              className="register__input"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </label>

          <label className="register__checkbox">
            <input
              type="checkbox"
              checked={form.acceptsRules}
              onChange={handleChange("acceptsRules")}
            />
            <span>
              Acepto las <Link to="/reglas">reglas del reino</Link>
            </span>
          </label>

          {error && (
            <p className="register__error" role="alert">
              {error}
            </p>
          )}

          <button
            className="register__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>

        <p className="register__login-hint">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </section>
  );
}