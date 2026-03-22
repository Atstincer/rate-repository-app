import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  return {
    repository: loading ? undefined : data.repository,
    error,
    loading,
  };
};

export default useRepository;
