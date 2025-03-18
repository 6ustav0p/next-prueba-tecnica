"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const filterProducts = async (cantidadMinima?: number, fechaCreacion?: string) => {
  try {
    const res = await fetch(`${API_URL}/productos`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Error al obtener los productos");
    }

    let productos = await res.json();

    if (cantidadMinima) {
      productos = productos.filter((producto: any) => producto.cantidad >= cantidadMinima);
    }

    if (fechaCreacion) {
      productos = productos.filter((producto: any) => producto.creacion === fechaCreacion);
    }

    return productos;
  } catch (error) {
    console.error("Error en filterProducts:", error);
    return [];
  }
};
