"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/productos`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  return res.json();
};
