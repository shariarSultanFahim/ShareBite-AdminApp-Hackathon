// "use client";

import { useQuery } from "@tanstack/react-query";
import instance from "..";

interface AdminListParams {
  page?: number;
  paginate?: boolean;
  search?: string;
}

export const getAdminList = async (params?: AdminListParams) =>
  await instance.get("/admin", {
    params,
  });

export const useGetAdminList = (params?: AdminListParams) => {
  return useQuery({
    queryKey: ["admin-list", params],
    queryFn: () => getAdminList(params),
  });
};
