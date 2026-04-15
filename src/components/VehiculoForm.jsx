import { useEffect, useState } from "react";
import {
  createVehiculo,
  updateVehiculo,
} from "../services/vehiculo.service";

export default function VehiculoForm({
  onSaved,
  editing,
  setEditing,
}) {
  const [form, setForm] = useState({
    placa: "",
    marca: "",
    modelo: "",
    anio: "",
  });

  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (editing) {
      setForm({
        placa: editing.placa,
        marca: editing.marca,
        modelo: editing.modelo,
        anio: editing.anio,
      });
    } else {
      setForm({
        placa: "",
        marca: "",
        modelo: "",
        anio: "",
      });
    }
  }, [editing]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.placa.trim() ||
      !form.marca.trim() ||
      !form.modelo.trim() ||
      !form.anio
    ) {
      return alert("Placa, Marca, Modelo y Año son obligatorios.");
    }

    try {
      setSaving(true);

      if (editing) {
        /* ✏️ UPDATE */
        await updateVehiculo(editing.placa, {
          marca: form.marca.trim(),
          modelo: form.modelo.trim(),
          anio: Number(form.anio),
        });

        setEditing(null);
        alert("Vehículo actualizado 🚗");
      } else {
        /* ➕ CREATE */
        await createVehiculo({
          placa: form.placa.trim().toUpperCase(),
          marca: form.marca.trim(),
          modelo: form.modelo.trim(),
          anio: Number(form.anio),
        });

        alert("Vehículo creado 🚗");
      }

      setForm({
        placa: "",
        marca: "",
        modelo: "",
        anio: "",
      });

      onSaved?.();
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        alert("La placa ya existe en el sistema.");
      } else {
        alert("Error guardando vehículo");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h3>
        {editing ? "✏️ Editar Vehículo" : "➕ Nuevo Vehículo"}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <input
          name="placa"
          placeholder="Placa *"
          value={form.placa}
          onChange={onChange}
          disabled={!!editing} // 🔥 no cambiar placa en edición
        />

        <input
          name="marca"
          placeholder="Marca *"
          value={form.marca}
          onChange={onChange}
        />

        <input
          name="modelo"
          placeholder="Modelo *"
          value={form.modelo}
          onChange={onChange}
        />

        <input
          name="anio"
          type="number"
          placeholder="Año *"
          value={form.anio}
          onChange={onChange}
        />
      </div>

      <button type="submit" disabled={saving} style={{ marginTop: 12 }}>
        {saving
          ? "Guardando..."
          : editing
          ? "Actualizar"
          : "Guardar"}
      </button>

      {editing && (
        <button
          type="button"
          onClick={() => setEditing(null)}
          style={{ marginLeft: 10 }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}