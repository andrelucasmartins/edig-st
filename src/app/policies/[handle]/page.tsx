import { storefront } from "@/utils/storefront";
import { Suspense } from "react";

const PoliciesQuery = `#graphql
query getPageByHandle($handle: String!) {
	page(handle: $handle) {
		id
		title
    body # The description of the page, complete with HTML formatting.
	}
}
`;

export default async function PoliciesPage({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await storefront(PoliciesQuery, {
    handle: params.handle,
  });

  const policy = data?.page;

  return (
    <div className="lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="text-3xl font-bold text-purple-900">{policy?.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: policy?.body }} />
      </Suspense>
    </div>
  );
}
