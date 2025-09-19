"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Card, Form, Input, message, Select } from "antd";
import { useEmployeeCreate } from "@/lib/actions/admin/employee.create";
import employeeSchema, { FormValues } from "./employee.schema";
const { Item } = Form;

export function DonateForm() {
  const { mutateAsync: employee, isPending } = useEmployeeCreate();
  const [messageApi, contextHolder] = message.useMessage();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      email: "",
      phone: "",
      username: "",
      avatar: "",
      passhash: "wefwef4342f434gg4424t234w",
      passphrase: "",
      role: "ADMIN",
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    // Clearing errors
    messageApi.open({
      type: "loading",
      content: "Creating...",
      duration: 0,
    });

    // Ensure avatar is a File or undefined
    const employeeData = {
      ...values,
      avatar: values.avatar ?? "",
    };
    // Making the request
    const res = await employee(employeeData);

    messageApi.destroy();

    if (res.status === 201) {
      reset();
      messageApi.success("Employee Created successfully!");
    } else {
      messageApi.error("Failed to create employee. Please try again.");
    }
    messageApi.destroy();
  }

  return (
    <>
      {contextHolder}
      <Card className="shadow-md">
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <Controller
            control={control}
            name={"email"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Email"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input {...field} placeholder="Enter email" size="large" />
              </Item>
            )}
          />
          {/* Phone */}
          <Controller
            control={control}
            name={"phone"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Phone"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  placeholder="Enter phone number"
                  size="large"
                />
              </Item>
            )}
          />
          {/* Username */}
          <Controller
            control={control}
            name={"username"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Username"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input {...field} placeholder="Enter username" size="large" />
              </Item>
            )}
          />
          {/* Avatar (URL) */}
          <Controller
            control={control}
            name={"avatar"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Avatar URL"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  placeholder="Enter avatar URL (optional)"
                  size="large"
                />
              </Item>
            )}
          />

          {/* Password Phrase */}
          <Controller
            control={control}
            name={"passphrase"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Password Phrase"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input.Password
                  {...field}
                  placeholder="Enter password phrase"
                  size="large"
                />
              </Item>
            )}
          />
          {/* Role Dropdown */}
          <Controller
            control={control}
            name={"role"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Role"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Select
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  size="large"
                  options={[
                    { label: "Admin", value: "ADMIN" },
                    { label: "Hub Manager", value: "HUB_MANAGER" },
                    { label: "Rider", value: "RIDER" },
                  ]}
                  placeholder="Select role"
                  style={{ width: "100%" }}
                />
              </Item>
            )}
          />
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={isPending}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
}
