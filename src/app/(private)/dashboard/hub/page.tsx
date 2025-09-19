"use client";
import { useGetHubList } from "@/lib/actions/hub/hub.list";
import { Table } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
];

export default function HubPage() {
  const { data: hub, isLoading } = useGetHubList();

  return (
    <Table
      dataSource={hub?.data?.data?.results}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{ position: ["bottomRight"], defaultPageSize: 5 }}
    />
  );
}
