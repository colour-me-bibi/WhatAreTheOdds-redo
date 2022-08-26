import axios from "#/api/axiosInstance";
import useAuth from "#/hooks/useAuth";
import { Portfolio, QueryHook } from "#/types";

import { QueryKey, useQuery } from "@tanstack/react-query";

const getUser: QueryHook<Portfolio> = (options) => {
  const { isLoggedIn } = useAuth();

  return useQuery(
    ["user", "portfoilio"] as QueryKey,
    () => axios.get<Portfolio>("portfolio/").then(({ data: portfolio }) => portfolio),
    {
      enabled: isLoggedIn,
      ...options,
    },
  );
};

export default getUser;
