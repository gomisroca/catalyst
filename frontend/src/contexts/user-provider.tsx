import { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import { getCookie, removeCookie } from '@/lib/cookies';

interface JWTUser {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatar: string;
  role: string;
  postInteractions: Interaction[];
  branchInteractions: Interaction[];
  followedBy: string[];
  projects: Project[];
  branches: Branch[];
  posts: Post[];
}

type UserProviderState = {
  user?: JWTUser;
  signOut: () => void;
};

const UserContext = createContext<UserProviderState>({} as UserProviderState);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<JWTUser | undefined>();
  const accessToken = getCookie('__catalyst__jwt');

  const getUserInfo = async (accessToken: string): Promise<JWTUser | void> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(await res.json());
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = async () => {
    try {
      removeCookie('__catalyst__jwt');
      setUser(undefined);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect((): void => {
    if (accessToken && !user) {
      getUserInfo(accessToken);
    }
  }, [accessToken, user]);

  return <UserContext.Provider value={{ user, signOut }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error('useUser must be used within a UserProvider');

  return context;
};
