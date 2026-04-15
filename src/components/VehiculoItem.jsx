import { deleteVehiculo } from "../services/vehiculo.service";

export default function VehiculoItem({ vehiculo, onChange, setEditing }) {
  const handleDelete = async () => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar el vehículo con placa: ${vehiculo.placa}?`
    );

    if (!confirmacion) return;

    try {
      await deleteVehiculo(vehiculo.placa);

      alert("Vehículo eliminado con éxito 🚗");

      onChange?.();
    } catch (err) {
      console.error("Error al eliminar:", err);

      const msg =
        err.response?.data?.message || "No se pudo eliminar el vehículo";

      alert(msg);
    }
  };

  return (
    <tr style={{ textAlign: "center" }}>
      
      {/* 🚗 PLACA (MEJORADA) */}
      <td>
        <span
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            padding: "4px 10px",
            borderRadius: "6px",
            display: "inline-block",
            letterSpacing: "1px",
          }}
        >
          {vehiculo.placa}
        </span>
      </td>

      {/* MARCA */}
      <td>{vehiculo.marca}</td>

      {/* MODELO */}
      <td>{vehiculo.modelo}</td>

      {/* AÑO */}
      <td>{vehiculo.anio}</td>

      {/* MANTENIMIENTOS */}
      <td>
        {vehiculo.mantenimientos?.length > 0 ? (
          <span style={{ color: "green" }}>
            {vehiculo.mantenimientos.length} registro(s)
          </span>
        ) : (
          <span style={{ color: "#95a5a6", fontStyle: "italic" }}>
            Sin servicios
          </span>
        )}
      </td>

      {/* ACCIONES */}
      <td>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {/* ✏️ EDITAR */}
          <button
            onClick={() => setEditing?.(vehiculo)}
            style={{
              padding: "4px 8px",
              cursor: "pointer",
              backgroundColor: "#f39c12",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Editar
          </button>

          {/* 🗑 ELIMINAR */}
          <button
            onClick={handleDelete}
            style={{
              padding: "4px 8px",
              cursor: "pointer",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}