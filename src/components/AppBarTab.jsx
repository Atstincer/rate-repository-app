import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: theme.appBar.textColor,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text fontSize={"subheading"} fontWeight={"bold"} style={styles.text}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
