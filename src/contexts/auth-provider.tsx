import { ReactNode, createContext, useContext, useState } from "react";
import { IAuth } from "../types/auth";
import { login_async, verifyAuth } from "../api/auth";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IAuthContext {
  user: IAuth;
  login: (v: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const initial_state = {
  token: verifyAuth(),
  name: "",
  email: "",
  phone: "",
};

const initial_context: IAuthContext = {
  user: initial_state,
  login: async () => {},
  logout:  () => {},
};

const AuthContext = createContext<IAuthContext>(initial_context);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuth>(initial_state);
  const queryClient = useQueryClient();


  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await login_async(credentials);
      if (response?.accesToken) {
        setUser((prev) => ({ ...prev, token: response.accesToken }));
        localStorage.setItem(
          import.meta.env.VITE_AUTH_KEY,
          response.accesToken
        );
      }
    } catch (err) {
      toast.error((err as Error).message);
      console.log((err as Error).message);
    }
  };
  const logout =  () => {
    localStorage.removeItem(import.meta.env.VITE_AUTH_KEY);
    queryClient.clear()
    setUser(initial_state);
  };

  const values = { user, login,logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
