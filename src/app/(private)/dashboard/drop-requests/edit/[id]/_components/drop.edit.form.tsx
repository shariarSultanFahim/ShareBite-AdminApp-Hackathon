"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, message, Select } from "antd";
import dropEditSchema, { FormValues } from "./drop.edit.schema";
import { useGetHubList } from "@/lib/actions/hub/hub.list";
import { useDropUpdate } from "@/lib/actions/drop-requests/drop.request.update";
const { Item } = Form;

export function DropEditForm({
  status,
  id: dropID,
}: {
  status: string | undefined;
  id: string | undefined;
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const { data: hub } = useGetHubList();

  // Prepare hub options
  const hubOptions =
    hub?.data?.data?.results?.map((h: { id: string; name: string }) => ({
      value: h.id,
      label: h.name,
    })) || [];

  const { mutate: updateDrop } = useDropUpdate();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(dropEditSchema),
    defaultValues: {
      status: status || "",
      hubId: hub?.data?.data?.results?.[0]?.id || 1,
      adminId: 1,
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    // Clearing errors
    messageApi.open({
      type: "loading",
      content: "Updating ...",
      duration: 0,
    });
    const res = await updateDrop({ dropID, ...values });

    messageApi.destroy();

    if (res.status) {
      messageApi.success("Status Updated successfully!");
    } else {
      messageApi.error("Failed to update status. Please try again.");
    }
    messageApi.destroy();
  }

  return (
    <>
      {" "}
      {contextHolder}
      <Card className="shadow-md" style={{ maxWidth: 800, margin: "0 auto" }}>
        <Form
          layout="vertical"
          className="font-semibold"
          requiredMark={false}
          onSubmitCapture={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name={"status"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Item<FormValues>
                  label="Status"
                  style={{ marginBottom: "12px" }}
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Item noStyle>
                    <Select
                      size="large"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={`Current Status: ${status || ""}`}
                      options={[
                        {
                          value: "ACCEPTED",
                          label: "Accept",
                          disabled: status === "ACCEPTED",
                        },
                        {
                          value: "REJECTED",
                          label: "Reject",
                          disabled: status === "REJECTED",
                        },
                        {
                          value: "DELIVERED",
                          label: "Delivered",
                          disabled: status === "DELIVERED",
                        },
                      ]}
                      className={error ? "border-red-500 w-full" : "w-full"}
                    />
                  </Item>
                </Item>
              </>
            )}
          />
          <Controller
            control={control}
            name={"hubId"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Item<FormValues>
                  label="Hub"
                  style={{ marginBottom: "12px" }}
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Item noStyle>
                    <Select
                      size="large"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={`Current Hub: ${
                        hub?.data?.data?.results?.[0]?.name || ""
                      }`}
                      options={hubOptions}
                      className={error ? "border-red-500 w-full" : "w-full"}
                    />
                  </Item>
                </Item>
              </>
            )}
          />

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Update
          </Button>
        </Form>
      </Card>
    </>
  );
}
