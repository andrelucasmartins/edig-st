export default function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <section className="mx-auto p-14 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </section>
  );
}
