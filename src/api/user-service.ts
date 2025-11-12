import apiClient from "./api-client";

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export interface User extends SignUpReq, SignInReq{
    address?:  Address;
    id?:       number;
    name?:     Name;
    phone?:    string;
    __v?:      number;
}

export interface Address {
    geolocation?: Geolocation;
    city?:        string;
    street?:      string;
    number?:      number;
    zipcode?:     string;
}

export interface Geolocation {
    lat?:  string;
    long?: string;
}

export interface Name {
    firstname?: string;
    lastname?:  string;
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

// Get all users
const getUsers = () => apiClient.get<User[]>({ url: UserApi.User });

// Get a single user by ID
const getUserById = (id: number) =>
  apiClient.get<User>({ url: `${UserApi.User}/${id}` });

// Create a new user
const createUser = (data: Pick<User, 'id' | 'email' | 'username' | 'password'>) =>
  apiClient.post<User>({ url: UserApi.User, data });

// Update a user
const updateUser = (id: number, data: Pick<User, 'id' | 'email' | 'username' | 'password'>) =>
  apiClient.put<User>({ url: `${UserApi.User}/${id}`, data });

// Delete a user
const deleteUser = (id: number) =>
  apiClient.delete({ url: `${UserApi.User}/${id}` });

export default {
  signin,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
