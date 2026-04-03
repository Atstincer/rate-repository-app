import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { ME } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, { refetchQueries: [ME] });

  const deleteReview = async (reviewId) => {
    const { data } = await mutate({
      variables: { deleteReviewId: reviewId },
    });
    console.log("respose inside deleteReview method", data);
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
