"use client";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces";
import { saveProduct, deleteProduct } from "@/actions";
import { ProductForm } from "../product-form/ProductForm";
import Swal from "sweetalert2";

interface Props {
  product: Product;
}

export const ProductPageClient = ({ product }: Props) => {
  const router = useRouter();

  const handleSave = async (formData: Product) => {
    await saveProduct(formData);
    Swal.fire({
      title: "Guardado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Eliminar producto",
      text: "¿Estás seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(product.id);
        Swal.fire({
          title: "Producto eliminado",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
      }
    });
  };


  return (
    <div className="flex flex-col items-center justify-center px-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <ProductForm product={product} onSave={handleSave} onDelete={handleDelete} />
    </div>
  );
};
