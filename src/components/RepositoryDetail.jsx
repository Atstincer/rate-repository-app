import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const RepositoryDetail = () => {
  const { id } = useParams();
  //console.log("id capture in new View", id);

  const { repository, loading } = useRepository(id);

  return loading ? null : <RepositoryItem item={repository} detailView />;
};

export default RepositoryDetail;
