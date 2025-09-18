import { useMutation } from "@tanstack/react-query";
import instance from "..";

interface SignupData {
  email: string;
  password: string;
  username: string;
  phone: string;
  address: string;
  avatar?: File;
}

const signup = (data: SignupData) => {
  console.log(data);
  return instance.post("/auth/signup", { ...data });
};

export const useSignup = () => {
  return useMutation({ mutationFn: signup });
};
