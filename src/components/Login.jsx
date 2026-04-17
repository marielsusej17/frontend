import { useState } from "react";
import { loginRequest } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Completa los campos");
    }

    try {
      setLoading(true);

      const res = await loginRequest({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.accessToken;

      if (!token) {
        throw new Error("No llegó el token desde el backend");
      }

      login(token);
      navigate("/app");

    } catch (err) {
      alert(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <div className="icon">🚗</div>
          <h1>Velocity Drive</h1>
          <p>Accede a tu cuenta</p>
        </div>

        <form onSubmit={onSubmit} className="login-form">

          <div className="input-group">
            <input
              type="email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Correo electrónico</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Contraseña</label>
          </div>

          {/* 🔥 OLVIDASTE CONTRASEÑA (SOLO VISUAL) */}
          <div className="login-extra">
            <span className="link">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <button disabled={loading} className="login-submit">
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        {/* 🔥 REGISTRO (SOLO VISUAL) */}
        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <span className="link">Regístrate</span>
          </p>

          <span onClick={() => navigate("/")}>
            ← Volver al inicio
          </span>
        </div>

      </div>
    </div>
  );
}