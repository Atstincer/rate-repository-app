import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={styles.textInput}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  textInput: {
    minHeight: 30,
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: 15,
    borderRadius: theme.borderRadius.general,
    padding: 5,
  },
  buttonText: { color: "white", textAlign: "center" },
});

export default SignIn;
