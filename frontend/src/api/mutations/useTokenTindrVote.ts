import { MutationHook } from "#/types";
import axios from "#/api/axiosInstance";

import { useMutation } from "@tanstack/react-query";

const useTokenTindrVote: MutationHook<any, number> = (options) => {
  return useMutation((imageId) => axios.post<any>(`token_tindr/${imageId}/`, {}).then(({ data }) => data), options);
};

export default useTokenTindrVote;
