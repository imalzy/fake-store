import apiClient from "./api-client";

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export interface User extends SignUpReq {
  id?: number;
}

export interface UserResponse {
  token: string;
}

export const UserApi = {
  SignIn: "/auth/login",
  User: "/users",
} as const;

const signin = (data: SignInReq) =>
  apiClient.post<UserResponse>({ url: UserApi.SignIn, data });

const users = () => apiClient.get<User[]>({ url: UserApi.User });

export default {
  signin,
  users,
};
