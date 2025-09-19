// "use client";

import { useQuery } from "@tanstack/react-query";
import instance from "..";

interface HubListParams {
  page?: number;
  paginate?: boolean;
  search?: string;
}

export const getHubList = async (params?: HubListParams) =>
  await instance.get("/hub", {
    params,
  });

export const useGetHubList = (params?: HubListParams) => {
  return useQuery({
    queryKey: ["hub-list", params],
    queryFn: () => getHubList(params),
  });
};
