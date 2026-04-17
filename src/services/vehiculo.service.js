import api from "../api/axios";

/** Listar vehículos */
export const listVehiculos = (params = {}) =>
  api.get("/vehiculos", { params });

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