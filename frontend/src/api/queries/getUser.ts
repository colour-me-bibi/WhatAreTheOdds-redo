import axios from "#/api/axiosInstance";
import useAuth from "#/hooks/useAuth";
import { QueryHook, User } from "#/types";

import { QueryKey, useQuery } from "@tanstack/react-query";

const getUser: QueryHook<User> = (options) => {
  const { isLoggedIn } = useAuth();

  return useQuery(["user"] as QueryKey, () => axios.get<User>("auth/user/").then(({ data: user }) => user), {
    enabled: isLoggedIn,
    ...options,
  });
};

export default getUser;
