import { useMutation } from "@tanstack/react-query";
import instance from "..";

interface DropUpdateData {
  dropID: string;
}

const dropUpdate = async ({ dropID, ...data }: DropUpdateData) => {
  return instance.post(`/drop/${dropID}/status`, { ...data });
};

export const useDropUpdate = () => {
  return useMutation({ mutationFn: dropUpdate });
};
