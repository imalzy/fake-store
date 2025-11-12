import z from "zod";

export const userSchema = z
  .object({
    username: z.string("").min(1, "Username is Required"),
    email: z.email({ message: "Invalid Email" }),
    password: z.string("").min(6, "Password is Required"),
    confirmPassword: z.string(""),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type UserType = z.infer<typeof userSchema>;
