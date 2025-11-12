import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserType } from "./UserSchema";

export const useUserForm = () => {
  const [userModal, setUserModal] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleReset = () => {
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return {
    userModal,
    setUserModal,
    
    control,
    handleSubmit,
    trigger,
    reset,
    handleReset,
    errors,
  };
};
