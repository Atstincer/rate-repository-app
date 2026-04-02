import { Pressable, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import useAuthStorage from "../../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: theme.appBar.textColor,
  },
});

const SingOutTab = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onPress = async () => {
    console.log("tab pressed");
    const accessToken = await authStorage.getAccessToken();
    console.log("checking authStorage property", accessToken);
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <Pressable onPress={onPress}>
      <Text fontSize={"subheading"} fontWeight={"bold"} style={styles.text}>
        SignOut
      </Text>
    </Pressable>
  );
};

export default SingOutTab;
