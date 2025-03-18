'use server';
import { Product } from "@/interfaces";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const saveProduct = async (product: Product) => {
  const method = product.id ? "PUT" : "POST";
  const url = product.id
    ? `${API_URL}/productos/${product.id}`
    : `${API_URL}/productos`;

  const { id, ...productData } = product; 

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!res.ok) throw new Error("Error al guardar el producto");

  return res.json();
};
