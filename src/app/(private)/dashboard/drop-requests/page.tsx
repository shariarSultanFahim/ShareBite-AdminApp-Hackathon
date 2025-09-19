/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetDropList } from "@/lib/actions/drop-requests/drops.list";
import { Button, Table, Tag } from "antd";

const editDropRequest = (id: number) => {
  window.location.href = `/dashboard/drop-requests/edit/${id}`;
};

import type { ColumnsType } from "antd/es/table";

type DropRequest = {
  id: number;
  drop_type: string;
  description: string;
  assumed_person_for: number;
  status: string;
  donor?: { username?: string };
  created_at: string;
  updated_at: string;
};

const columns: ColumnsType<DropRequest> = [
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
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "For",
    dataIndex: "assumed_person_for",
    key: "assumed_person_for",
    render: (value: number) => value || "-",
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
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
        case "DELIVERED":
          color = "green";
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
    title: "Donor Name",
    dataIndex: ["donor", "username"],
    key: "donor",
    width: 120,
    render: (_: any, record: DropRequest) => record.donor?.username || "-",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) => new Date(date).toLocaleString(),
    width: 150,
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (date: string) => new Date(date).toLocaleString(),
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_: any, record: DropRequest) => (
      <Button
        type="link"
        onClick={() => {
          editDropRequest(record.id);
        }}
      >
        Edit
      </Button>
    ),
  },
];

export default function DropRequestsPage() {
  const { data: dropRequests, isLoading } = useGetDropList();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Drop Requests</h1>
      <Table
        dataSource={dropRequests?.data?.data?.results}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ position: ["bottomRight"], defaultPageSize: 5 }}
      />
    </div>
  );
}
