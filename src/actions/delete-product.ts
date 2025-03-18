'use server';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      throw new Error("Error al eliminar el producto");
    }
  };