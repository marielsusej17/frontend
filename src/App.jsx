import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import "./app.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import VehiculoForm from "./components/VehiculoForm";
import VehiculoList from "./components/VehiculoList";

import { listVehiculos } from "./services/vehiculo.service";

/* 🔐 PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { isAuth, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  /* 🔄 CARGAR VEHÍCULOS (CON BUSCADOR) */
  const loadVehiculos = async (q = "") => {
    try {
      const res = await listVehiculos(q);
      setItems(res.data.items || []);
    } catch (err) {
      console.log("ERROR LOAD VEHICULOS:", err);
    }
  };

  /* 🔄 CARGA INICIAL + BUSQUEDA */
  useEffect(() => {
    loadVehiculos(search);
  }, [search]);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🟢 PUBLIC */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 PRIVATE APP */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <div className="app-wrapper">

                {/* HEADER */}
                <header className="app-header">
                  <div className="app-header-content">

                    <h1 className="app-title">
                      🚗 <span>Velocity Drive</span>
                    </h1>

                    <button
                      onClick={logout}
                      className="logout-btn"
                      disabled={!isAuth}
                    >
                      Cerrar sesión
                    </button>

                  </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="app-main">

                  {/* 🔎 BUSCADOR (AQUÍ ESTÁ LO NUEVO) */}
                  <div className="card">
                    <input
                      type="text"
                      placeholder="Buscar por placa, marca o modelo..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  {/* FORM */}
                  <div className="card">
                    <h2>
                      {editing ? "✏️ Editar vehículo" : "➕ Registrar vehículo"}
                    </h2>

                    <VehiculoForm
                      onSaved={() => {
                        loadVehiculos(search);
                        setEditing(null);
                      }}
                      editing={editing}
                      setEditing={setEditing}
                    />
                  </div>

                  {/* LIST */}
                  <div className="card">
                    <h2>📋 Vehículos registrados</h2>

                    <VehiculoList
                      items={items}
                      onChange={() => loadVehiculos(search)}
                      setEditing={setEditing}
                    />
                  </div>

                </main>

              </div>
            </ProtectedRoute>
          }
        />

        {/* 🔁 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}