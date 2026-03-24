import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";
import SingOutTab from "./SingOutTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  console.log("data in AppBar", data);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={"Repositories"} link={"/"} />
        {(!data || !data.me) && <AppBarTab text={"Sign in"} link={"/SignIn"} />}
        {data && data.me && (
          <AppBarTab text={"Create a review"} link={"/NewReview"} />
        )}
        {data && data.me && <SingOutTab />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
