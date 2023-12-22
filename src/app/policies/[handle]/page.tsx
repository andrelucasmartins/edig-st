import { Breadcrumb } from "@/components/ui/breadcrumb"
import { storefront } from "@/utils/storefront"
import { Suspense } from "react"

const PoliciesQuery = `#graphql
query getPageByHandle($handle: String!) {
	page(handle: $handle) {
		id
		title
    body # The description of the page, complete with HTML formatting.
	}
}
`

// export const dynamic = 'force-dynamic'

export default async function PoliciesPage({
  params,
}: {
  params: { handle: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { data } = await storefront(PoliciesQuery, {
    handle: params.handle,
  })

  const policy = data?.page

  return (
    <div className="grid select-none grid-cols-1 gap-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumb currentPage={policy?.title} back />
        <h1 className="text-3xl font-bold text-purple-900">{policy?.title}</h1>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <div dangerouslySetInnerHTML={{ __html: policy?.body }} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams({ params }: { params: { handle: string } }) {
  return params.handle ? [{ handle: params.handle }] : []
}
