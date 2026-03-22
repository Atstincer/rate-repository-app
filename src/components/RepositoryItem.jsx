import { View, Image, StyleSheet, Pressable, Button } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
    borderRadius: theme.borderRadius.general,
  },
  containerMain: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    //flex: 1,
  },
  containerMainInfo: {
    //justifyContent: "space-evenly",
    gap: 8,
    alignItems: "flex-start",
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 7,
  },
  languajeContainer: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: theme.borderRadius.general,
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    padding: 5,
    borderRadius: theme.borderRadius.general,
    alignItems: "center",
  },
});

const getRightValue = (value) => {
  if (value < 1000) return value;
  const valueWithDecimal = (value / 1000).toFixed(1);
  return valueWithDecimal - Math.round(valueWithDecimal) === 0
    ? `${Math.round(valueWithDecimal)}k`
    : `${valueWithDecimal}k`;
};

//number.toFixed(1)
const DetailInfo = ({ name, value }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text fontWeight={"bold"}>{getRightValue(value)}</Text>
      <Text>{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item, detailView }) => {
  const navigate = useNavigate();
  //console.log(item.ownerAvatarUrl);
  return (
    <Pressable
      onPress={() => {
        if (!detailView) navigate(`/Repository/${item.id}`);
      }}
    >
      <View style={styles.containerMain} testID="repositoryItem">
        <View style={styles.innerContainer}>
          <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
          <View style={styles.containerMainInfo}>
            <Text fontWeight={"bold"}>{item.fullName}</Text>
            <Text style={{ flexWrap: "wrap", marginEnd: 10 }}>
              {item.description}
            </Text>
            <View style={styles.languajeContainer}>
              <Text style={{ color: "white" }}>{item.language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <DetailInfo name={"Stars"} value={item.stargazersCount} />
          <DetailInfo name={"Forks"} value={item.forksCount} />
          <DetailInfo name={"Reviews"} value={item.reviewCount} />
          <DetailInfo name={"Rating"} value={item.ratingAverage} />
        </View>
        {detailView && (
          <Pressable style={styles.button}>
            <Text fontWeight={"bold"} style={{ color: "white" }}>
              Open in Github
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
