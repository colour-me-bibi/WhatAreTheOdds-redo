import axios from "#/api/axiosInstance";
import { QueryHook, RedditSubmissions } from "#/types";

import { QueryKey, useQuery } from "@tanstack/react-query";

const getRedditSubmissions: QueryHook<RedditSubmissions, [term: string]> = (term, options) => {
  return useQuery(
    ["user", "portfoilio"] as QueryKey,
    () => axios.get<RedditSubmissions>(`reddit/search/${term}/`).then(({ data: submissions }) => submissions),
    options,
  );
};

export default getRedditSubmissions;
