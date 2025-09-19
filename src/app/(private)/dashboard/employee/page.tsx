"use client";
import { useGetAdminList } from "@/lib/actions/admin/admin.list";
import { Table, Card } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Employee Type",
    dataIndex: "role",
    key: "role",
    render: (role: string) =>
      role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  },
];

export default function EmployeePage() {
  const { data: admin, isLoading } = useGetAdminList();

  return (
    <Table
      dataSource={admin?.data?.data?.results}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{ position: ["bottomRight"], defaultPageSize: 5 }}
    />
  );
}
