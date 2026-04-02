import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";
import { StyleSheet, View } from "react-native";

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

const styles = StyleSheet.create({
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

export default ReviewItem;
