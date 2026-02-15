import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

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
    flex: 1,
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

const RepositoryItem = ({ item }) => {
  //console.log(item.ownerAvatarUrl);
  return (
    <View style={styles.containerMain}>
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
    </View>
  );
};

export default RepositoryItem;
