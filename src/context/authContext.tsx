import type { UserLogin } from "@/hooks/useUser";
import { createContext } from "react";

interface AuthContext {
  user: UserLogin | null;
  setUser: (user: UserLogin | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});
