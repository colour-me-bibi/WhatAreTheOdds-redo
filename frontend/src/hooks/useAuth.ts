import axios from "#/api/axiosInstance";
import { LoginCredentials, MutationHook, RegisterCredentials } from "#/types";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

const useSignIn: MutationHook<void, LoginCredentials> = (options) => {
  return useMutation(
    (loginCredentials) =>
      axios
        .post<{ key: string }>("auth/login/", loginCredentials)
        .then(({ data: { key: token } }) => localStorage.setItem("token", token)),
    options,
  );
};

const useSignOut: MutationHook<void, void> = (options) => {
  return useMutation(() => axios.post("auth/logout/").then(() => localStorage.removeItem("token")), options);
};

const useSignUp: MutationHook<void, RegisterCredentials> = (options) => {
  return useMutation(
    (registerCredentials) =>
      axios
        .post<{ key: string }>("auth/registration/", registerCredentials)
        .then(({ data: { key: token } }) => localStorage.setItem("token", token)),
    options,
  );
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem("token") !== null);

  const signUp = useSignUp({
    onSuccess: () => setIsLoggedIn(true),
    onError: (error) => console.log("Error occured while attempting to Sign Up...", error),
  });

  const signIn = useSignIn({
    onSuccess: () => setIsLoggedIn(true),
    onError: (error) => console.log("Error occured while attempting to Sign In...", error),
  });

  const signOut = useSignOut({
    onSuccess: () => setIsLoggedIn(false),
    onError: (error) => console.log("Error occured while attempting to Sign Out...", error),
  });

  return {
    isLoggedIn,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
