"use client";
import { Pagination } from "@/components/pagination/Pagination";
import { Product } from "@/interfaces";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "../product-card/ProductCard";
import { useRouter } from "next/navigation";

interface Props {
  productos: Product[];
}

export const ProductList = ({ productos }: Props) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("recent");
  const itemsPerPage = 8;
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const sortedProducts = [...productos].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.nombre.localeCompare(b.nombre);
      case "name-desc":
        return b.nombre.localeCompare(a.nombre);
      case "stock-asc":
        return a.cantidad - b.cantidad;
      case "stock-desc":
        return b.cantidad - a.cantidad;
      case "recent":
        return new Date(b.creacion).getTime() - new Date(a.creacion).getTime();
      case "oldest":
        return new Date(a.creacion).getTime() - new Date(b.creacion).getTime();
      default:
        return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="flex flex-col items-center justify-center px-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-6xl flex justify-between  mb-6 items-center gap-3">
        <button
          onClick={() => router.push("/product/new")}
          className="cursor-pointer w-fit px-4 max-w-4xl bg-blue-600 mt-8 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all mb-6"
        >
          Crear Producto
        </button>
        <div className="flex items-center relative gap-2 h-full">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Organizar por:
          </span>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-10 shadow-md focus:outline-none focus:ring focus:ring-blue-300 appearance-none"
          >
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="stock-asc">Stock (Menor a Mayor)</option>
            <option value="stock-desc">Stock (Mayor a Menor)</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-3 text-gray-500 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto min-h-[400px]">
        {currentProducts.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
