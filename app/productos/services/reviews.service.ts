import { api } from "@/app/lib/api-client";

type CreateReviewParams = {
  productId: number;
  rating: number;
  comment: string;
  image?: File | null;
};

export async function createReview({
  productId,
  rating,
  comment,
  image,
}: CreateReviewParams) {
  const formData = new FormData();
  formData.append("productId", String(productId));
  formData.append("rating", String(rating));
  formData.append("comment", comment);

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/store/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

