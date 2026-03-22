import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    gap: 6,
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  ratingContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const date = format(review.createdAt, "dd.MM.yyyy");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text color={"primary"} fontWeight={"bold"}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight={"bold"}>{review.user.username}</Text>
        <Text color={"textSecondary"}>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryDetail = () => {
  const { id } = useParams();
  //console.log("id capture in new View", id);

  const { repository, loading } = useRepository(id);
  const reviews = loading ? [] : repository.reviews.edges.map((e) => e.node);

  //if (!loading) console.log(reviews);

  return loading ? null : (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} detailView />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryDetail;
