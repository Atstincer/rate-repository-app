import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingOptions = {
  latest_repositories: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest_rated: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest_rated: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

const MyPicker = ({ state }) => {
  return (
    <Picker
      selectedValue={state.value}
      onValueChange={(itemValue, itemIndex) => state.setValue(itemValue)}
    >
      <Picker.Item label="Latest repositories" value={"latest_repositories"} />
      <Picker.Item label="Highest rated repositories" value={"highest_rated"} />
      <Picker.Item label="Lowest rated repositories" value={"lowest_rated"} />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, pickerState }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((e) => e.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={<MyPicker state={pickerState} />}
    />
  );
};

const RepositoryList = () => {
  const [value, setValue] = useState("latest_repositories");
  //console.log("value", value);

  const sortBy = SortingOptions[value];
  //console.log("sortBy", sortBy);
  const { repositories } = useRepositories(sortBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      pickerState={{ value, setValue }}
    />
  );
};

export default RepositoryList;
