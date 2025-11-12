import userService from "@/api/user-service";
import Input from "@/components/ui/Input";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { login } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { toast, type ToastOptions } from "react-toastify";
import { loginSchema, type LoginType } from "./LoginSchema";

const LoginForm = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { goTo, location } = useAppNavigation();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmitHandler = handleSubmit(
    async (data: LoginType) => {
      setIsLoading(true);

      if (!data?.username || !data?.password) {
        toast.error("Username and password are required");
        setIsLoading(false);
        return;
      }

      try {
        const resp = await userService.signin({
          username: data?.username,
          password: data?.password,
        });

        if (resp) {
          login(resp.token, data?.username);
          toast.success("Login successful!");
        }

        const from = location.state?.from?.pathname || "/dashboard";
        goTo(from, { replace: true });
        setIsLoading(false);
      } catch (error) {
        toast.error(
          "Login failed. Please try again.",
          error as unknown as ToastOptions<unknown>
        );
        setIsLoading(false);
      }
    },
    (err) => console.log(err)
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            icon={<FaUser />}
            label="Username"
            value={field.value}
            onChange={field.onChange}
            type={"text"}
            placeholder={"Enter username"}
            disabled={isLoading}
            errorMsg={error ? error.message : ""}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            icon={<FaLock />}
            label="Password"
            value={field.value}
            onChange={field.onChange}
            type="password"
            placeholder={"Enter Password"}
            disabled={isLoading}
            errorMsg={error ? error.message : ""}
          />
        )}
      />

      <Button
        variant="primary"
        type="submit"
        className="w-100 rounded-pill py-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
});

LoginForm.displayName = "LoginForm";
export default LoginForm;
