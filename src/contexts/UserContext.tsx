import Router from "next/router";
import { Dispatch, SetStateAction, createContext, ReactNode, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useToast } from "@chakra-ui/react";

import { options } from "../utils/toast";

type User = {
  username: string;
}

type UserContextData = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signIn: (username: string) => void;
  signOut: () => void;

  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const toast = useToast();

  const cookies = parseCookies(null);
  const username = cookies['codeleap.username'];

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User>({
    username: !username ? "" : username
  } as User);

  function signOut(): void {
    setIsLoading(true);

    toast({
      position: "top",
      title: 'Logged Out',
      status: 'success',
      ...options
    });

    setUser({ username: "" });
    destroyCookie(undefined, 'codeleap.username');

    Router.push('/');
    setIsLoading(false);

    return;
  }

  function signIn(username: string): void {
    if (username.length < 2) {
      toast({
        position: "top",
        title: 'Username error',
        description: 'Fill in the "username" field correctly (minimum of 2 characters)',
        status: 'error',
        ...options
      });

      return;
    }

    setIsLoading(true);

    setCookie(undefined, 'codeleap.username', username, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    setUser({ username });

    Router.push('/network');
    setIsLoading(false);

    return;
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      signIn,
      signOut,
      isLoading,
      setIsLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}