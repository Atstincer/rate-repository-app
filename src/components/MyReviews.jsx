import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data } = useQuery(ME, { variables: { includeReviews: true } });

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];
  //console.log("reviews in MyReviews", reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showActions />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default MyReviews;
