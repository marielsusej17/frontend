import VehiculoItem from "./VehiculoItem";

/**
 * Renderiza tabla de vehículos con acciones por fila
 */
export default function VehiculoList({ items, onChange, setEditing }) {
  if (!items?.length) {
    return <p>No hay vehículos registrados.</p>;
  }

  return (
    <table
      width="100%"
      border="1"
      cellPadding="8"
      style={{ borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Mantenimientos</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {items.map((vehiculo) => (
          <VehiculoItem
            key={vehiculo.placa}
            vehiculo={vehiculo}
            onChange={onChange}
            setEditing={setEditing}   // 🔥 IMPORTANTE
          />
        ))}
      </tbody>
    </table>
  );
}