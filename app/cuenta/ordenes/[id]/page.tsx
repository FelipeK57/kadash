export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">Orden #{params.id}</h1>
      <p className="text-muted-foreground mt-2">Detalles de tu compra</p>
    </main>
  );
}
