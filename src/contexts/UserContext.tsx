import Router from "next/router";
import { Dispatch, SetStateAction, createContext, ReactNode, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useToast } from "@chakra-ui/react";

type User = {
  username: string;
}

type UserContextData = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signIn: (username: string) => void;
  signOut: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const toast = useToast();

  const cookies = parseCookies(null);
  const username = cookies['codeleap.username'];

  const [user, setUser] = useState<User>({
    username: !username ? "" : username
  } as User);

  function signOut(): void {
    toast({
      position: "top",
      title: 'Logged Out',
      status: 'success',
      duration: 3000,
      isClosable: true
    });

    setUser({ username: "" });
    destroyCookie(undefined, 'codeleap.username');

    Router.push('/');
    return;
  }

  function signIn(username: string): void {
    if (username.length < 3) {
      toast({
        position: "top",
        title: 'Username error',
        description: 'Fill in the "username" field correctly (minimum of 3 characters)',
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      return;
    }

    setCookie(undefined, 'codeleap.username', username, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    setUser({ username });

    Router.push('/network');
    return;
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      signIn,
      signOut
    }}>
      {children}
    </UserContext.Provider>
  );
}