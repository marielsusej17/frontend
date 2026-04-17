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

  /* 🔄 CARGAR VEHÍCULOS */
  const loadVehiculos = async (value = "") => {
    try {
      const res = await listVehiculos(value);
      setItems(res.data); // ✅ CORRECTO (array directo)
    } catch (err) {
      console.log(err);
    }
  };

  /* 🔥 CARGA INICIAL */
  useEffect(() => {
    loadVehiculos();
  }, []);

  /* 🔎 BUS