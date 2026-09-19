import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return <main className="flow-page"><Link className="flow-brand" href="/">CEDAR<span>&</span>CLAY</Link><div className="dashboard-placeholder"><h3>That object has moved on.</h3><Link className="text-link" href="/">Return to the collection ↗</Link></div></main>;

  return <ProductDetailClient product={product} />;
}
