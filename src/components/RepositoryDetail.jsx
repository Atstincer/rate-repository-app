import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetail = () => {
  const { id } = useParams();
  //console.log("id capture in new View", id);

  const { repository, loading, fetchMore } = useRepository(id);
  const reviews = loading ? [] : repository.reviews.edges.map((e) => e.node);

  //if (!loading) console.log(reviews);

  const onEndReach = () => {
    console.log("end of review list reached...fetching more");
    fetchMore();
  };

  return loading ? null : (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} detailView />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryDetail;
