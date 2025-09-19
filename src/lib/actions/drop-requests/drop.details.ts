// "use client";

import { useQuery } from "@tanstack/react-query";
import instance from "..";

interface DropDetailsParams {
  id: string;
}

export const getDropDetails = async (params?: DropDetailsParams) =>
  await instance.get(`/drop/${params?.id}`);

export const useGetDropDetails = (params?: DropDetailsParams) => {
  return useQuery({
    queryKey: ["drop-details", params],
    queryFn: () => getDropDetails(params),
  });
};
