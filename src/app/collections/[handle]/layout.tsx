export const viewport = {
  colorScheme: "dark",
}

export const revalidate = 10
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
  params: {
    tag: string
    item: string
  }
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <section className="mx-auto  px-4 sm:px-6 sm:pb-6 lg:max-w-7xl lg:px-8">
      {children}
    </section>
  )
}
