import { storefront } from "@/utils/storefront";

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
      <h1 className="text-3xl font-bold">{policy?.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: policy?.body }} />
    </div>
  );
}
