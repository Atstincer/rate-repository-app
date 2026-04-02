import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = (includeReviews) => {
  const { data, error, loading } = useQuery(ME, {
    variables: { includeReviews },
  });

  return {
    me: loading ? undefined : data.me,
    error,
    loading,
  };
};

export default useMe;
