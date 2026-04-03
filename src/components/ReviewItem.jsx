import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";
import { Alert, Button, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewItem = ({ review, showActions }) => {
  const navigate = useNavigate();
  const [deleteReview, result] = useDeleteReview();
  const date = format(review.createdAt, "dd.MM.yyyy");

  function confirmDeleting() {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel button pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            console.log("delete button pressed");
            await deleteReview(review.id);
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
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
      {showActions && (
        <View style={styles.buttonsContainer}>
          <Button
            title="View repository"
            onPress={() => navigate(`/Repository/${review.repositoryId}`)}
          />
          <Button
            title="Delete review"
            color={"red"}
            onPress={() => confirmDeleting()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  mainContainer: {
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});

export default ReviewItem;
