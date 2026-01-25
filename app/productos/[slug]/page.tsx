export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">Producto: {params.slug}</h1>
      <p className="text-muted-foreground mt-2">Detalle del producto</p>
    </main>
  );
}
