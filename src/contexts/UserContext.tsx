import Router from "next/router";
import { Dispatch, SetStateAction, createContext, ReactNode, useState } from "react";
import { decode } from 'jsonwebtoken';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useToast } from "@chakra-ui/react";

import { options } from "../utils/toast";

type TokenPayload = {
  username: string;
  sub: string;
  exp: number;
  iat: number;
}

interface SignInData {
  token: string;
}

type User = {
  username: string;
  token: string;
}

type UserContextData = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signIn: ({ token }: SignInData) => void;
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
  const token = cookies['codeleap.token'];

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User>({
    username: !username ? "" : username,
    token: !token ? "" : token,
  } as User);

  function signOut(): void {
    setIsLoading(true);

    toast({
      position: "top",
      title: 'Logged Out',
      status: 'success',
      ...options
    });

    setUser({ username: "", token: "" });
    destroyCookie(undefined, 'codeleap.username');
    destroyCookie(undefined, 'codeleap.token');

    Router.push('/');
    setIsLoading(false);

    return;
  }

  function signIn({ token }: SignInData): void {
    setIsLoading(true);

    const { username } = decode(token) as TokenPayload;

    setCookie(undefined, 'codeleap.username', username, {
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    setCookie(undefined, 'codeleap.token', token, {
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    setUser({ username, token });

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