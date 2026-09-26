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

interface RegisterResponse {
  success: boolean;
  message: string;
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

  const [success, setSuccess] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const value =
          field === "acceptsRules"
            ? e.target.checked
            : e.target.value;

        setForm((prev) => ({
          ...prev,
          [field]: value,
        }));

        // Limpiamos los mensajes cuando el usuario modifica el formulario
        if (error) {
          setError(null);
        }

        if (success) {
          setSuccess(null);
        }
      };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // =========================
    // VALIDACIONES FRONTEND
    // =========================

    const username = form.username.trim();
    const email = form.email.trim();

    if (username.length < 3) {
      setError(
        "El nombre de usuario debe tener al menos 3 caracteres."
      );
      return;
    }

    if (username.length > 32) {
      setError(
        "El nombre de usuario no puede tener más de 32 caracteres."
      );
      return;
    }

    if (!email) {
      setError(
        "Debes introducir un correo electrónico."
      );
      return;
    }

    if (form.password.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError(
        "Las contraseñas no coinciden."
      );
      return;
    }

    if (!form.acceptsRules) {
      setError(
        "Tienes que aceptar las reglas del reino para continuar."
      );
      return;
    }

    // =========================
    // ENVÍO AL BACKEND
    // =========================

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username,
            password: form.password,
            email: email,
          }),
        }
      );

      // Intentamos leer la respuesta JSON
      const data: RegisterResponse = await response.json();

      // =========================
      // ERROR DEL BACKEND
      // =========================

      if (!response.ok) {
        throw new Error(
          data.message ||
          "No se pudo crear la cuenta."
        );
      }

      // =========================
      // REGISTRO CORRECTO
      // =========================

      setSuccess(
        data.message ||
        "Cuenta creada correctamente."
      );

      // Limpiamos el formulario
      setForm(initialState);

    } catch (error) {

      if (error instanceof Error) {

        setError(error.message);

      } else {

        setError(
          "No se pudo crear la cuenta. Intenta de nuevo en un momento."
        );
      }

    } finally {

      setSubmitting(false);
    }
  };

  return (
    <section className="register">
      <div className="register__panel">

        <h1 className="register__title">
          Crea tu cuenta
        </h1>

        <p className="register__lede">
          Un usuario y una contraseña — sin correo de
          verificación, sin pagos. Los usarás para el
          sitio y para entrar al juego.
        </p>

        <form
          className="register__form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* USERNAME */}

          <label className="register__field">
            <span className="register__label">
              Nombre de usuario
            </span>

            <input
              className="register__input"
              type="text"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange("username")}
              disabled={submitting}
            />
          </label>

          {/* EMAIL */}

          <label className="register__field">
            <span className="register__label">
              Correo electrónico
            </span>

            <input
              className="register__input"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
              disabled={submitting}
            />
          </label>

          {/* PASSWORD */}
          <label className="register__field">
            <span className="register__label">
              Contraseña
            </span>

            <div className="register__password-wrapper">
              <input
                className="register__input"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange("password")}
                disabled={submitting}
              />

              <button
                type="button"
                className="register__password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <span className="register__hint">
              Mínimo 8 caracteres.
            </span>
          </label>


          {/* CONFIRM PASSWORD */}

          <label className="register__field">
            <span className="register__label">
              Confirmar contraseña
            </span>

            <div className="register__password-wrapper">
              <input
                className="register__input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                disabled={submitting}
              />

              <button
                type="button"
                className="register__password-toggle"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>


          {/* RULES */}

          <label className="register__checkbox">
            <input
              type="checkbox"
              checked={form.acceptsRules}
              onChange={handleChange("acceptsRules")}
              disabled={submitting}
            />

            <span>
              Acepto las{" "}
              <Link to="/reglas">
                reglas del reino
              </Link>
            </span>
          </label>

          {/* ERROR */}

          {error && (
            <p
              className="register__error"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* SUCCESS */}

          {success && (
            <p
              className="register__success"
              role="status"
            >
              {success}
            </p>
          )}

          {/* SUBMIT */}

          <button
            className="register__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Creando cuenta…"
              : "Crear cuenta"}
          </button>

        </form>

        <p className="register__login-hint">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </p>

      </div>
    </section>
  );
}
