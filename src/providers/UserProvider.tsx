import Cookies from 'js-cookie';
import { createContext, useEffect, useMemo, useState } from 'react';

interface User {
  access_token: string;
  refresh_token: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface UserProviderProps {
  children: React.ReactNode; 
}

const UserContext = createContext<UserContextProps | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Memoize the context value using the `useMemo` hook
  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const allTokens = Cookies.get();

    if (allTokens && allTokens.access_token && allTokens.refresh_token) {
      setUser({ access_token: allTokens.access_token, refresh_token: allTokens.refresh_token });
    }
  }, []);

  console.log(user);

  return (
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
