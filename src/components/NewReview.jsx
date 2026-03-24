import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCrerateReview";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer("rating should be an integer")
    .required("Rating is required")
    .min(0, "rating should be greater than 0")
    .max(100, "rating should be minor than 100"),
  text: yup.string().optional(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.textInput,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.textInputError,
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[
          { ...styles.textInput, marginTop: 10 },
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.textInputError,
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: "red" }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={[
          { ...styles.textInput, marginTop: 10 },
          formik.touched.rating &&
            formik.errors.rating &&
            styles.textInputError,
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        style={{ ...styles.textInput, marginTop: 10 }}
      />

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const NewReview = () => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    console.log("values onSubmit", { ownerName, repositoryName, rating, text });

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      //console.log("data in NewReview component", data.createReview);
      if (data) navigate(`/Repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("error in NewReview component", e);
      //console.log("result.data", result.data);
      //console.log("result.loading", result.loading);
      //console.log("result.error", result.error);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
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

export default NewReview;
