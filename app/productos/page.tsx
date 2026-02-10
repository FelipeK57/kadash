import { getCategories, getProducts } from "./services/product.service";
import ProductsClient from "./products-client";

type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage(props: Props) {
  const searchParams = await props.searchParams;

  // Obtén las categorías como array
  const categoryParam = searchParams.category;
  const categories = categoryParam
    ? categoryParam.split(",").map((c) => c.trim())
    : undefined;

  const products = await getProducts({
    categories,
    sort: searchParams.sort,
  });

  const categoriesList = await getCategories();

  return (
    <ProductsClient products={products.items} categories={categoriesList} />
  );
}
