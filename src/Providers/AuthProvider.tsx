import { AuthContext } from "@/context/authContext";
import { USER_KEY, type UserLogin } from "@/hooks/useUser";
import { useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const stored = localStorage.getItem(USER_KEY);
  const initialUser = stored ? JSON.parse(stored) : null;

  const [user, setUser] = useState<UserLogin | null>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
