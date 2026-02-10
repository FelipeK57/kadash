import { getProducts } from "./services/product.service";
import ProductsClient from "./products-client";

export default async function ProductsPage() {
  const products = await getProducts();
  console.log("Fetched products:", products);

  return <ProductsClient products={products.items} />;
}
