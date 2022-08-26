import axios from "#/api/axiosInstance";
import { Market, QueryHook } from "#/types";

import { QueryKey, useQuery } from "@tanstack/react-query";

const getMarket: QueryHook<Market, [marketId: number]> = (marketId, options) => {
  return useQuery(
    ["market", marketId] as QueryKey,
    () => axios.get<Market>(`markets/${marketId}/`).then(({ data: market }) => market),
    options,
  );
};

export default getMarket;
