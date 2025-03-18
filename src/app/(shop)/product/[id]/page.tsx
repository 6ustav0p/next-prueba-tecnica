import { getProductById } from "@/actions";
import { redirect } from "next/navigation";
import { Product } from "@/interfaces";
import { ProductPageClient } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  const product = await getProductById(id);

  if (!product && id !== "new") {                                  
    redirect("/");
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">

      <ProductPageClient product={product ?? {} as Product} />
    </div>
  );
}
