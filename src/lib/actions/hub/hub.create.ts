import { useMutation } from "@tanstack/react-query";
import instance from "..";

interface HubData {
  name: string;
  location: string;
  contact: string;
}

const hub = (data: HubData) => {
  return instance.post("/hub", { ...data });
};

export const useHubCreate = () => {
  return useMutation({ mutationFn: hub });
};
