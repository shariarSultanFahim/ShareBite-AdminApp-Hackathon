"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Card, Form, Input, message, Select } from "antd";
import { useEmployeeCreate } from "@/lib/actions/admin/employee.create";
import { FormValues, hubSchema } from "./hub.schema";
import { useHubCreate } from "@/lib/actions/hub/hub.create";
const { Item } = Form;

export function DonateForm() {
  const { mutateAsync: hub, isPending } = useHubCreate();
  const [messageApi, contextHolder] = message.useMessage();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(hubSchema),
    defaultValues: {
      contact: "",
      name: "",
      location: "",
    },
  });

  async function onSubmit(values: FormValues) {
    // console.log(values);
    // Clearing errors
    messageApi.open({
      type: "loading",
      content: "Creating...",
      duration: 0,
    });

    // Making the request
    const res = await hub(values);

    messageApi.destroy();

    if (res.status === 201) {
      reset();
      messageApi.success("Hub Created successfully!");
    } else {
      messageApi.error("Failed to create hub. Please try again.");
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
          <Controller
            control={control}
            name={"name"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Hub Name"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  placeholder="Dhaka Central Hub"
                  size="large"
                />
              </Item>
            )}
          />
          {/* Phone */}
          <Controller
            control={control}
            name={"contact"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Contact"
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
            name={"location"}
            render={({ field, fieldState: { error } }) => (
              <Item
                label="Location"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  placeholder="Rampura, Dhaka, Bangladesh"
                  size="large"
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
