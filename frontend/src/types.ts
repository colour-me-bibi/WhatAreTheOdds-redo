import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface User {
  pk: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  tokenAmount: number;
}

export interface Tag {
  name: string;
}

export interface Contract {
  id: number;
  name: string;
}

export interface ContractFormData {
  name: string;
}

export interface SelectedContract {
  contract: Contract;
  bestPrice: number;
  contractType: "Y" | "N";
  offerType: "B" | "S";
}

export interface Market {
  id: number;
  name: string;
  rules: string;
  tags: Tag[];
  contracts: Contract[];
}

export interface MarketFormData {
  name: string;
  rules: string;
  tags: Tag[];
  contracts: ContractFormData[];
}

export interface Offer {
  id: number;
  shareAmount: number;
  price: number;
  createdAt: string;
  contractType: "Y" | "N";
  offerType: "B" | "S";
  contract: number;
  user: number;
}

export interface OfferFormData {
  shareAmount: number;
  price: number;
  contractType: "Y" | "N";
  offerType: "B" | "S";
  contract: number;
  user: number;
}

export interface Investment {
  id: number;
  shareAmount: number;
  price: number;
  createdAt: string;
  contractType: "Y" | "N";
  offerType: "B" | "S";
  contract: number;
}

export interface Portfolio {
  username: string;
  pendingOffers: Offer[];
  currentInvestments: Investment[];
}

export interface TokenTindr {
  one: {
    id: number;
    imageUrl: string;
  };
  two: {
    id: number;
    imageUrl: string;
  };
}

export interface RedditSubmission {
  author: string;
  createdUtc: number;
  edited: boolean;
  over18: boolean;
  permalink: string;
  score: number;
  selftext: string;
  subreddit: string;
  title: string;
  upvoteRatio: number;
  url: string;
}

export interface RedditSubmissions {
  term: string;
  submissions: RedditSubmission[];
}

////////////////////////////////////////////////////////////////////////////////

export type AddParams<TParams extends [...args: any], TFunc extends (...args: any) => any> = (
  ...args: [...TParams, ...Parameters<TFunc>]
) => ReturnType<TFunc>;

export type QueryHook<TData, TParams extends [...args: any] = [], TError = Error> = AddParams<
  TParams,
  (options?: UseQueryOptions<TData, TError>) => UseQueryResult<TData, TError>
>;

export type MutationHook<TData, TVariables, TParams extends [...args: any] = [], TError = Error> = AddParams<
  TParams,
  (options?: UseMutationOptions<TData, TError, TVariables>) => UseMutationResult<TData, TError, TVariables>
>;
