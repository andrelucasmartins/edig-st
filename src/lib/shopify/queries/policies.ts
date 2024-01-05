export const PoliciesQuery = /* GraphQL */ `
  query getPageByHandle($handle: String!) {
    page(handle: $handle) {
      id
      title
      body # The description of the page, complete with HTML formatting.
    }
  }
`
