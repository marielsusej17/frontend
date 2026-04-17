import api from "../api/axios";

/** Listar vehículos (con búsqueda opcional) */
export const listVehiculos = (q = "") =>
  api.get("/vehiculos", {
    params: { q }
  });

/** Crear vehículo */
export const createVehiculo = (data) =>
  api.post("/vehiculos", data);

/** Obtener vehículo por placa */
export const getVehiculo = (placa) =>
  api.get(`/vehiculos/${placa}`);

/** Actualizar vehículo por placa */
export const updateVehiculo = (placa, data) =>
  api.put(`/vehiculos/${placa}`, data);

/** Eliminar vehículo por placa */
export const deleteVehiculo = (placa) =>
  api.delete(`/vehiculos/${placa}`);