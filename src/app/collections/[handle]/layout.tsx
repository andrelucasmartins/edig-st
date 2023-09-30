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
    <section className="mx-auto  px-4 sm:pb-6 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </section>
  );
}
