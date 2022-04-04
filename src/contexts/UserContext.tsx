import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";

type User = {
  username: string;
}

type UserContextData = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
}