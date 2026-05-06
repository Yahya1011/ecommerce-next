import db from "@/lib/db";
import ProductFormClient from "@/components/admin/ProductFormClient";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const [rows]: any = await db.query("SELECT * FROM products WHERE id = ?", [
    Number(id), // Konversi string ke number
  ]);
  console.log("Product data:", rows); // Debug log untuk melihat data yang diambil
  if (rows.length === 0) return null;
  return rows[0];
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // Ubah jadi Promise
}) {
  const { id } = await params; // Await params-nya
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-6">
      <ProductFormClient initialData={product} />
    </div>
  );
}
