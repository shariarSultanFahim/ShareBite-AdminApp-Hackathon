import { useMutation } from "@tanstack/react-query";
import instance from "..";

interface SignInData {
  email: string;
  password: string;
}

const signin = (data: SignInData) => {
  return instance.post("/auth/login", { ...data });
};

export const useSignin = () => {
  return useMutation({ mutationFn: signin });
};
