"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input, message } from "antd";
import loginSchema, { FormValues } from "./login.schema";
import { signIn } from "next-auth/react";
const { Item, ErrorList } = Form;

export function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    // Clearing errors
    messageApi.open({
      type: "loading",
      content: "Signing in..",
      duration: 0,
    });

    // Making the request
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    messageApi.destroy();

    if (result?.error) {
      messageApi.error(result.error || "Failed to login. Please try again.");
    } else {
      //redirect to dashboard page
      window.location.href = "/dashboard";
    }
  }

  return (
    <>
      {" "}
      {contextHolder}
      <div className="pb-10 text-center">
        <h1 className="pb-1 text-2xl font-bold">Welcome</h1>
        <p className="font-medium">Sign in with your credentials.</p>
      </div>
      <Card className="shadow-md">
        <Form
          layout="vertical"
          className="font-semibold"
          requiredMark={false}
          onSubmitCapture={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name={"email"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Item<FormValues>
                  label="Email"
                  style={{ marginBottom: "12px" }}
                >
                  <Item noStyle>
                    <Input
                      placeholder="johndoe@example.com"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </Item>
                  <ErrorList
                    className="text-red-500"
                    fieldId="email"
                    errors={[error?.message]}
                  />
                </Item>
              </>
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Item<FormValues>
                  label="Password"
                  style={{ marginBottom: "12px" }}
                >
                  <Item noStyle>
                    <Input.Password
                      placeholder="******"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </Item>
                  <ErrorList
                    className="text-red-500"
                    fieldId="password"
                    errors={[error?.message]}
                  />
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
            Login
          </Button>
        </Form>
      </Card>
    </>
  );
}
