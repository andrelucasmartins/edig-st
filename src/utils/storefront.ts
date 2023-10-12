export interface ShopifyFetchProps {
  query: string;
  variables: object;
}

export async function storefront(query: string, variables = {}) {
  "use serve";
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN_QL as string;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    });

    return result.json();
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}
