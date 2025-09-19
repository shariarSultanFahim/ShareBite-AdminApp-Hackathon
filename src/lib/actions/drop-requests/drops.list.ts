// "use client";

import { useQuery } from "@tanstack/react-query";
import instance from "..";

interface DropListParams {
  page?: number;
  paginate?: boolean;
  search?: string;
}

export const getDropList = async (params?: DropListParams) =>
  await instance.get("/drop", {
    params,
  });

export const useGetDropList = (params?: DropListParams) => {
  return useQuery({
    queryKey: ["drop-list", params],
    queryFn: () => getDropList(params),
  });
};
