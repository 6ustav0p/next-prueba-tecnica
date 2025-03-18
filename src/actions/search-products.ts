"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { Product } from "@/interfaces";

const normalizeText = (text: string) => {
  return text
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase();
};

export const searchProducts = async (query: string) => {
  if (!query.trim()) return [];

  try {
    const res = await fetch(`${API_URL}/productos`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener productos");
    }

    let products = await res.json();

    if (!Array.isArray(products)) {
      console.error("Error: La respuesta de productos no es un array", products);
      return [];
    }

    console.log("Productos obtenidos:", products);

    const formattedQuery = normalizeText(query);

    const filteredProducts = products.filter((product: Product) => {
      if (!product || typeof product !== "object") return false;

      const nombreMatch = product.nombre
        ? normalizeText(product.nombre).includes(formattedQuery)
        : false;

      const codigoMatch = product.id
        ? product.id.toString().includes(formattedQuery)
        : false;

      return nombreMatch || codigoMatch;
    });

    console.log("Resultados de búsqueda filtrados:", filteredProducts);

    return filteredProducts.map((product: any) => ({
      ...product,
      sugerencia: `${product.nombre} (#${product.codigo})`,
    }));
  } catch (error) {
    console.error("Error en searchProducts:", error);
    return [];
  }
};
