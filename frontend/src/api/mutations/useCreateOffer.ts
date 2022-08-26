import axios from "#/api/axiosInstance";
import useAuth from "#/hooks/useAuth";
import { MutationHook, Offer, OfferFormData } from "#/types";

import { useMutation } from "@tanstack/react-query";

const useCreateMarket: MutationHook<Offer, OfferFormData> = (options) => {
  return useMutation(
    (offerFormData) => axios.post<Offer>("offers/", offerFormData).then(({ data: offer }) => offer),
    options,
  );
};

export default useCreateMarket;
