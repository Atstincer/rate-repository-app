import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { user: { username, password } },
    });
    console.log("respose inside signUp method, useSignUp hook", data);
    return data;
  };

  return [signUp, result];
};

export default useSignUp;
