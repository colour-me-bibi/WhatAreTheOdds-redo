import axios from "#/api/axiosInstance";
import useAuth from "#/hooks/useAuth";
import { QueryHook, TokenTindr } from "#/types";

import { QueryKey, useQuery } from "@tanstack/react-query";

const getUser: QueryHook<TokenTindr> = (options) => {
  const { isLoggedIn } = useAuth();

  return useQuery(
    ["user", "token_tinder"] as QueryKey,
    () => axios.get<TokenTindr>("token_tindr/").then(({ data: token_tindr }) => token_tindr),
    {
      enabled: isLoggedIn,
      ...options,
    },
  );
};

export default getUser;
