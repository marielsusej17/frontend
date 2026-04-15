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
  const [editing, setEditing] = useState(null); // 🔥 EDIT STATE

  /* 🔄 CARGAR VEHÍCULOS */
  const loadVehiculos = async () => {
    try {
      const res = await listVehiculos();
      setItems(res.data.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* 🔄 CARGA INICIAL */
  useEffect(() => {
    loadVehiculos();
  }, []);

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

                  {/* FORM */}
                  <div className="card">
                    <h2>
                      {editing ? "✏️ Editar vehículo" : "➕ Registrar vehículo"}
                    </h2>

                    <VehiculoForm
                      onSaved={() => {
                        loadVehiculos();
                        setEditing(null); // limpiar edición después de guardar
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
                      onChange={loadVehiculos}
                      setEditing={setEditing} // 🔥 PARA EDITAR
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