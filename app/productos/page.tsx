import { getCategories, getProducts } from "./services/product.service";
import ProductsClient from "./products-client";

type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
    q?: string;
  }>;
};

export default async function ProductsPage(props: Props) {
  const searchParams = await props.searchParams;

  const categoryParam = searchParams.category;
  const categories = categoryParam
    ? categoryParam.split(",").map((c) => c.trim())
    : undefined;

  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const query = searchParams.q?.trim() || undefined;

  const data = await getProducts({
    categories,
    sort: searchParams.sort,
    page,
    q: query,
  });

  const categoriesList = await getCategories();

  return (
    <ProductsClient
      products={data.items}
      categories={categoriesList}
      pagination={data.pagination}
    />
  );
}
