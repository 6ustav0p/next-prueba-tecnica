"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/interfaces";
import { Loader, Navbar, ProductList } from "@/components";
import { getProducts } from "../actions/get-products";
import { searchProducts } from "@/actions/search-products";

export default function App() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{ cantidadMinima?: number; fechaCreacion?: string }>({});
  const [hasFilters, setHasFilters] = useState(false); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProductos(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const applySearchAndFilters = async () => {
    try {
      let results = productos;

      if (searchQuery.trim() !== "") {
        results = await searchProducts(searchQuery);
      }

      results = results.filter((product) => {
        const matchesCantidad = filters.cantidadMinima ? product.cantidad >= filters.cantidadMinima : true;
        const matchesFecha = filters.fechaCreacion ? product.creacion >= filters.fechaCreacion : true;
        return matchesCantidad && matchesFecha;
      });

      setFilteredProducts(results);
      setHasFilters(Object.keys(filters).length > 0); 
    } catch (error) {
      console.error("Error en búsqueda y filtros:", error);
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    applySearchAndFilters();
  }, [searchQuery, filters, productos]);

  const clearFilters = async () => {
    setSearchQuery("");
    setFilters({});
    setHasFilters(false); 
    const data = await getProducts();
    setFilteredProducts(data);
  };

  return (
    <div>
      <Navbar onSearch={setSearchQuery} onApplyFilters={setFilters} onClearFilters={clearFilters} hasFilters={hasFilters} />
      
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) :
      filteredProducts.length > 0 ? (
        <ProductList productos={filteredProducts} />
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
        <span className="text-gray-400 dark:text-gray-500 text-lg font-semibold">
          No se encontraron productos con:
        </span>
        <span className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 shadow-lg">
          "{searchQuery}"
        </span>
      </div>
      )}
    </div>
  );
}
