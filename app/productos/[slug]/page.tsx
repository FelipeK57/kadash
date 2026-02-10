import { getProductBySlug } from "../services/product.service";
import ProductClient from "./product-client";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  console.log("Fetched product:", product);

  return <ProductClient product={product} />;
}
