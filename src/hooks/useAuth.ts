import { useEffect } from "react";
import { toast } from "react-toastify";

import userService from "@/api/user-service";

import { USER_KEY, useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

useEffect(() => {
  const storedUser = getItem(USER_KEY);
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    addUser(parsedUser);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const login = async (username: string, password: string) => {
    try {
      const res = await userService.signin({
        username,
        password,
      });

      const userData = {
        id: Date.now().toString(),
        name: username,
        username: username,
        authToken: res.token,
      };
      addUser(userData);
      toast.success(`Welcome back, ${username}! 🎉`);
      return true;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).response?.data?.message || "Login failed 😞");
      throw error;
    }
  };

  const logout = () => {
    removeUser();
    toast.success("You have been logged out!");
  };

const isAuthenticated = () => !!getItem(USER_KEY);

  return { user, login, logout, setUser, isAuthenticated };
};
