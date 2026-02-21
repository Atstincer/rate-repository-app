import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
//import { useState, useEffect } from "react";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  /*const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    const response = await fetch("http://192.168.0.17:5000/api/repositories");
    const json = await response.json();

    console.log(json);

    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);*/

  const repositoryNodes = repositories
    ? repositories.edges.map((e) => e.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
