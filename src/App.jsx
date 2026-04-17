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

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  const { isAuth, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  /* 🔄 CARGAR VEHÍCULOS */
  const loadVehiculos = async (q = "") => {
    try {
      const res = await listVehiculos(q);
      setItems(res.data.items || []);
    } catch (err) {
      console.log("ERROR LOAD VEHICULOS:", err);
    }
  };

  /* 🔥 SOLO CARGA INICIAL */
  useEffect(() => {
    loadVehiculos("");
  }, []);

  /* 🔎 BUSCAR CON BOTÓN (NO AUTOMÁTICO) */
  const handleSearch = () => {
    loadVehiculos(search);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

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

                    <button onClick={logout} className="logout-btn">
                      Cerrar sesión
                    </button>

                  </div>
                </header>

                <main className="app-main">

                  {/* 🔎 BUSCADOR CON BOTÓN */}
                  <div className="card" style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Buscar por placa, marca o modelo..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="search-input"
                    />

                    <button onClick={handleSearch}>
                      🔍 Buscar
                    </button>
                  </div>

                  {/* FORM */}
                  <div className="card">
                    <h2>
                      {editing ? "✏️ Editar vehículo" : "➕ Registrar vehículo"}
                    </h2>

                    <VehiculoForm
                      onSaved={() => {
                        loadVehiculos("");
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

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}