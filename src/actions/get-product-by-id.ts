'use server';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProductById = async (id: string) => {
  if (id === "new") return null; 

  try {
    const res = await fetch(`${API_URL}/productos/${id}`, { cache: "no-store" });

    if (res.status === 404) return null; 

    if (!res.ok) {
      throw new Error(`Error al obtener el producto: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error en getProductById:", error);
    return null; 
  }
};
