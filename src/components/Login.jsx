import { useState } from "react";
import { loginRequest } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  // 🔥 FIX: faltaba esto
  const { login } = useAuth();

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

      // 🔥 seguridad: verificar token
      const token = res?.data?.token;

      if (!token) {
        throw new Error("No se recibió token del servidor");
      }

      login(token);
      navigate("/app");

    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">
          <div className="icon">🚗</div>
          <h1>Velocity Drive</h1>
          <p>Accede a tu cuenta</p>
        </div>

        {/* FORM */}
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

          <button disabled={loading} className="login-submit">
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="login-footer">
          <span onClick={() => navigate("/")}>
            ← Volver al inicio
          </span>
        </div>

      </div>
    </div>
  );
}