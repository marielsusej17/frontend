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
  const [search, setSearch] = useState(""); // 🔥 BUSCADOR

  /* 🔄 CARGAR VEHÍCULOS */
  const loadVehiculos = async (value = "") => {
    try {
      const res = await listVehiculos(value);
      setItems(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* 🔄 CARGA INICIAL + BUSCADOR EN VIVO */
  useEffect(() => {
    loadVehiculos(search);
  }, [search]);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🟢 PUBLIC */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 PRIVATE */}
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

                {/* MAIN */}
                <main className="app-main">

                  {/* 🔎 BUSCADOR */}
                  <div className="card">
                    <input
                      type="text"
                      placeholder="🔎 Buscar por placa, marca o modelo..."
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