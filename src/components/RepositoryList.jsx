import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

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

const HeaderComponent = ({ pickerState, searchBarState }) => {
  return (
    <View>
      <MySearchBar state={searchBarState} />
      <MyPicker state={pickerState} />
    </View>
  );
};

const MySearchBar = ({ state }) => {
  return (
    <Searchbar
      value={state.value}
      onChangeText={state.setValue}
      placeholder="Search"
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  pickerState,
  searchBarState,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((e) => e.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={
        <HeaderComponent
          pickerState={pickerState}
          searchBarState={searchBarState}
        />
      }
    />
  );
};

const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("latest_repositories");
  const [searchQuery, setSearchQuery] = useState(undefined);
  //console.log("searchBy", searchQuery);
  const { repositories } = useRepositories({
    ...SortingOptions[sortKey],
    searchKeyword: searchQuery,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      pickerState={{ value: sortKey, setValue: setSortKey }}
      searchBarState={{ value: searchQuery, setValue: setSearchQuery }}
    />
  );
};

export default RepositoryList;
