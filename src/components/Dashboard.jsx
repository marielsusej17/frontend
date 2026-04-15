import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="hero">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <span>Velocity Drive</span>
        </div>

        <div className="navbar-right">

          <ul className="menu">
            <li>Inicio</li>
            <li>Vehículos</li>
            <li>Servicios</li>
            <li>Nosotros</li>
          </ul>

          <a
            href="https://github.com/marielsusej17/carlosedison"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            🔗 GitHub
          </a>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

        </div>
      </nav>

      {/* HERO */}
      <div className="hero-content">

        <div className="text">
          <h1>
            DRIVE THE <br />
            <span>FUTURE</span>
          </h1>

          <p>
            Descubre una nueva forma de conducir. Vehículos modernos,
            seguros y listos para cualquier aventura.
          </p>

          <div className="buttons">
            <button className="buy">Explorar vehículos</button>
            <button className="read">Ver más</button>
          </div>
        </div>

        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="car"
          />
        </div>

      </div>

      {/* STATS */}
      <div className="stats">
        <div>
          <h3>+300</h3>
          <span>Vehículos disponibles</span>
        </div>
        <div>
          <h3>+200</h3>
          <span>Clientes satisfechos</span>
        </div>
        <div>
          <h3>+80</h3>
          <span>Ciudades activas</span>
        </div>
      </div>

    </div>
  );
}