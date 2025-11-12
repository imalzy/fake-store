import { useCallback, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "@/context/authContext";

export interface UserLogin {
  id?: string;
  name?: string;
  username?: string;
  authToken?: string;
}
export const USER_KEY = "fake_store_user";

export const useUser = () => {
  const context = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  const { user, setUser } = context;

  const addUser = useCallback(
    (user: UserLogin) => {
      setUser(user);
      setItem(USER_KEY, JSON.stringify(user));
    },
    [setUser, setItem]
  );

  const removeUserFromStorage = useCallback(() => {
    setUser(null);
    removeItem(USER_KEY);
  }, [setUser, removeItem]);

  return { user, addUser, removeUser: removeUserFromStorage, setUser };
};