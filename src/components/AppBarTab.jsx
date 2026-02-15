import { StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: theme.appBar.textColor,
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}>
      <Text fontSize={"subheading"} fontWeight={"bold"} style={styles.text}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
