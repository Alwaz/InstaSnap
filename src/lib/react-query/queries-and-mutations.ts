import { INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  useInfiniteQuery,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createUserAccount, logout, signInAccount } from "../appwrite/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useLogoutAccount = () => {
  return useMutation({
    mutationFn: logout,
  });
};
