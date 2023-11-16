import { storefront } from "@/utils/storefront";

const getProductReviews = /* GraphQL */ `
  query getProduct($productId: ID!) {
    product(id: $productId) {
      id
      title
      # reviews(first: 5) {
      #   edges {
      #     node {
      #       id
      #       title
      #       rating
      #       author
      #       content
      #     }
      #   }
      # }
    }
  }
`;

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  const productData = await storefront(getProductReviews, {
    productId,
  });

  const product = productData.data?.product;

  //TODO: Add reviews
  // console.log("Preview: ", product);

  return (
    <div>
      <h2>Reviews</h2>
      <h3>{product.title}</h3>
      <ul>
        {product.reviews?.edges.map(({ node }) => (
          <li key={node.id}>
            <h3>{node.title}</h3>
            <p>Rating: {node.rating}/5</p>
            <p>{node.content}</p>
            <p>By: {node.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
