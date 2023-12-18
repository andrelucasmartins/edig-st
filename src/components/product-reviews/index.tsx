import { aliexpressFetch } from "@/lib/aliexpress";
import Image from "next/image";
import { RangeStarts } from "../ui/rangeStarts";

// const getProductReviews = /* GraphQL */ `
//   query getProduct($productId: ID!) {
//     product(id: $productId) {
//       id
//       title
//       reviews(first: 5) {
//          edges {
//            node {
//              id
//              title
//              rating
//              author
//              content
//            }
//          }
//        }
//     }
//   }
// `;

interface ProductReviewsProps {
  productId: string;
}

interface PreviewProps {
  anonymous: boolean;
  buyerAddFbContent: string;
  buyerAddFbDate: string;
  buyerAddFbDays: number;
  buyerAddFbImages: string[];
  buyerAddFbThumbnails: string[];
  buyerAddFbTranslation: string;
  buyerCountry: string;
  buyerEval: number;
  buyerFbType: object;
  buyerFeedback: string;
  buyerHeadPortrait: string;
  buyerName: string;
  buyerProductFeedBack: string;
  buyerTranslationFeedback: string;
  downVoteCount: number;
  evalDate: string;
  evaluationId: number;
  evaluationIdStr: string;
  images: string[];
  logistics: string;
  status: string;
  thumbnails: string[];
  upVoteCount: number;
}

export const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  console.log(productId);
  // const productData = await storefront(getProductReviews, {
  //   productId,
  // });

  // const product = productData.data?.product;

  const { body } = await aliexpressFetch(1005005628926370);
  const previews: PreviewProps[] = body?.data?.evaViewList;
  const productEvaluationStatistic = body?.data?.productEvaluationStatistic;

  return (
    <div>
      <div>
        <RangeStarts size={productEvaluationStatistic.evarageStar} />{" "}
        <h2>{productEvaluationStatistic?.totalNum} Avaliações</h2>
      </div>
      <ul className="flex flex-col gap-4">
        {previews.map((prev) => (
          <li key={prev?.evaluationId} className="flex flex-col gap-2">
            <h3>{prev?.buyerTranslationFeedback}</h3>
            <div className="flex flex-row items-center gap-2">
              {prev?.thumbnails?.map((image) => (
                <Image
                  key={image}
                  src={image}
                  width={109}
                  height={109}
                  alt="Imagem do produto recebido"
                  className="h-[109px] w-[109px] rounded-lg object-cover object-center"
                />
              ))}
            </div>
            {/* <p>Rating: {prev.rating}/5</p>
            <p>{prev.buyerTranslationFeedback}</p>
            <p>By: {prev.buyerName}</p> */}
          </li>
        ))}
      </ul>
      {/* <pre>{JSON.stringify(previews, null, "\t")}</pre> */}
    </div>
  );
};
