"use client";
import React from "react";
import { Package, Calendar } from "lucide-react";
import { Product } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Props {
  producto: Product;
}

export const ProductCard = ({ producto }: Props) => {
  const router = useRouter();

  // Función para truncar la descripción si es demasiado larga
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-all transform hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-blue-500/40 cursor-pointer border border-gray-700 dark:border-gray-700
      flex flex-col justify-between h-43"
      onClick={() => router.push(`/product/${producto.id}`)}
    >
      {/* Nombre del Producto */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        {producto.nombre}
      </h2>

      {/* Descripción Truncada */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {truncateText(producto.descripcion, 80)}
      </p>

      {/* Información Adicional */}
      <div className="flex justify-between items-center text-gray-400 text-sm gap-3">
        {/* Cantidad en Stock */}
        <span className="flex items-center gap-1">
          <Package size={18} className="text-blue-400" />
          <strong className="text-white">{producto.cantidad}</strong> en stock
        </span>

        {/* Fecha de Creación */}
        <span className="flex items-center gap-1">
          <Calendar size={18} className="text-green-400" />
          {producto.creacion}
        </span>
      </div>
    </div>
  );
};
