import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    //console.log("values onSubmit", username, password);

    try {
      const data = await signIn({ username, password });
      console.log("data in SignIn component", data);
      if (data) navigate("/");
    } catch (e) {
      console.log("error in SignIn component", e);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.textInputError,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={[
          { ...styles.textInput, marginTop: 10 },
          formik.touched.password &&
            formik.errors.password &&
            styles.textInputError,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}

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
    borderWidth: 1,
    paddingStart: 5,
  },
  textInputError: { borderColor: theme.colors.error },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.general,
    padding: 7,
    marginTop: 15,
  },
  buttonText: { color: "white", textAlign: "center" },
});

export default SignIn;
