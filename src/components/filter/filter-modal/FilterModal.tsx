"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { cantidadMinima?: number; fechaCreacion?: string }) => void;
}

export const FilterModal = ({ isOpen, onClose, onApplyFilters }: Props) => {
  const [cantidadMinima, setCantidadMinima] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters({
      cantidadMinima: cantidadMinima ? Number(cantidadMinima) : undefined,
      fechaCreacion: fechaCreacion || undefined
    });
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose} 
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Filtrar Productos</h2>

        <label className="block text-sm mb-2">Cantidad mínima:</label>
        <input
          type="number"
          placeholder="Ej: 10"
          className="w-full p-2 bg-gray-700 rounded-lg mb-4"
          value={cantidadMinima}
          onChange={(e) => setCantidadMinima(e.target.value)}
        />

        <label className="block text-sm mb-2">Fecha de creación:</label>
        <input
          type="date"
          className="w-full p-2 bg-gray-700 rounded-lg mb-4"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />

        <button
          onClick={handleApplyFilters}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};
