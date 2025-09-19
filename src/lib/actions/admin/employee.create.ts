import { useMutation } from "@tanstack/react-query";
import instance from "..";

interface AdminData {
  email: string;
  phone: string;
  username: string;
  avatar: string;
  passhash: string;
  passphrase: string;
  role: string;
}

const admin = (data: AdminData) => {
  return instance.post("/admin", { ...data });
};

export const useEmployeeCreate = () => {
  return useMutation({ mutationFn: admin });
};
