"use client";
import { useGetDropList } from "@/lib/actions/drop-requests/drops.list";
import { Table, Tag } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Drop Type",
    dataIndex: "drop_type",
    key: "drop_type",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "For",
    dataIndex: "assumed_person_for",
    key: "assumed_person_for",
    render: (value: number) => value || "-",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "default";
      switch (status) {
        case "PENDING":
          color = "gold";
          break;
        case "ACCEPTED":
          color = "blue";
          break;
        case "REJECTED":
          color = "red";
          break;
        case "PICKED":
          color = "purple";
          break;
        case "DELIVERED":
          color = "green";
          break;
        case "CANCELLED":
          color = "volcano";
          break;
        default:
          color = "default";
      }
      return (
        <Tag color={color}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Tag>
      );
    },
  },
  {
    title: "Donor",
    dataIndex: ["donor", "username"],
    key: "donor",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (_: any, record: any) => record.donor?.username || "-",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) => new Date(date).toLocaleString(),
  },
];

export default function DropRequestsPage() {
  const { data: dropRequests, isLoading } = useGetDropList();

  return (
    <Table
      dataSource={dropRequests?.data?.data?.results}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{ position: ["bottomRight"], defaultPageSize: 5 }}
    />
  );
}
