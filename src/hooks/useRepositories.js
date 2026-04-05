import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    //console.log("canFetchMore", canFetchMore);
    if (!canFetchMore) {
      return;
    }

    const vars = {
      after: data.repositories.pageInfo.endCursor,
      ...variables,
    };

    //console.log("fetching more reps with vars", vars);

    fetchMore({
      variables: vars,
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
