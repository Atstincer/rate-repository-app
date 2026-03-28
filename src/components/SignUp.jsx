import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  pwconfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is required"),
  password: yup.string().min(5).max(50).required("password is required"),
  pwconfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Doesn't match password")
    .required("password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
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

      <TextInput
        placeholder="Password confirmation"
        value={formik.values.pwconfirmation}
        onChangeText={formik.handleChange("pwconfirmation")}
        secureTextEntry
        style={[
          { ...styles.textInput, marginTop: 10 },
          formik.touched.pwconfirmation &&
            formik.errors.pwconfirmation &&
            styles.textInputError,
        ]}
      />
      {formik.touched.pwconfirmation && formik.errors.pwconfirmation && (
        <Text style={{ color: "red" }}>{formik.errors.pwconfirmation}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, pwconfirmation } = values;
    console.log("values onSubmit", username, password, pwconfirmation);

    try {
      const dataSignUp = await signUp({ username, password });
      console.log("dataSignUp onSubmit", dataSignUp);
      const dataSignIn = await signIn({ username, password });
      console.log("dataSignIn onSubmit", dataSignIn);
      if (dataSignUp && dataSignIn) navigate("/");
    } catch (e) {
      console.log("error in SignUp component", e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
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

export default SignUp;
