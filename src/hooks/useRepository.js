import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const variables = { repositoryId: id, first: 8 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    console.log("canFetchMore", canFetchMore);
    if (!canFetchMore) {
      return;
    }

    const vars = {
      after: data.repository.reviews.pageInfo.endCursor,
      ...variables,
    };

    console.log("fetching more reps with vars", vars);

    fetchMore({
      variables: vars,
    });
  };

  return {
    repository: loading ? undefined : data.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
