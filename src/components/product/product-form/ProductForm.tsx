"use client";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/actions";

interface Props {
  product: Product;
  onSave: (formData: Product) => void;
  onDelete?: () => void;
}

export const ProductForm = ({ product, onSave, onDelete }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    id: product?.id ?? "",
    nombre: product?.nombre ?? "",
    descripcion: product?.descripcion ?? "",
    cantidad: product?.cantidad ?? 0,
    creacion: product?.creacion ?? new Date().toISOString().split("T")[0],
  });
  const [productosExistentes, setProductosExistentes] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProductosExistentes(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.cantidad || Number(formData.cantidad) < 0)
      newErrors.cantidad = "La cantidad no puede ser negativa.";
    if (!Number.isInteger(Number(formData.cantidad)))
      newErrors.cantidad = "La cantidad debe ser un número entero.";
    
    const nombreDuplicado = productosExistentes.some(
      (p) => p.nombre.toLowerCase() === formData.nombre.toLowerCase() && p.id !== formData.id
    );

    if (nombreDuplicado) {
      newErrors.nombre = "Ya existe un producto con este nombre.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);
    onSave(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition mb-6"
        >
          <ArrowLeft size={20} />
          Volver a todos los productos
        </button>

        <form onSubmit={handleSubmit} className="space-y-6 min-w-[400px] max-w-2xl">
          {formData.id && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Código
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                readOnly
                className="w-full p-3 border rounded-lg mt-1 bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white ${
                errors.nombre ? "border-red-500" : ""
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white ${
                errors.descripcion ? "border-red-500" : ""
              }`}              rows={4}
            ></textarea>
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 dark:text-white ${
                errors.cantidad ? "border-red-500" : ""
              }`}
            />
            {errors.cantidad && (
              <p className="text-red-500 text-sm mt-1">{errors.cantidad}</p>
            )}
          </div>

          <div className={`flex ${!product.id ? 'justify-center':'justify-between'} items-center mt-6`}>
            <div className="flex justify-center gap-4 mt-8">
              <button
                type="submit"
                className={`cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-md`}
              >
                <Save size={20} />
                Guardar Producto
              </button>

              { product.id && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="cursor-pointer flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition shadow-md"
                >
                  <Trash2 size={20} />
                  Eliminar Producto
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
