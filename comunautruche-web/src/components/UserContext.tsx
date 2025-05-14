import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthenticatedUser } from './Types';

type UserContextType = {
  user: AuthenticatedUser | null;
  setUserFromLogin: (user: AuthenticatedUser) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPseudo = localStorage.getItem('userPseudo');
    
    if (storedEmail && storedPseudo) {
      setUser({
        email: storedEmail,
        pseudo: storedPseudo,
      });
    }
  }, []);

  const setUserFromLogin = (user: AuthenticatedUser) => {
    setUser(user);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userPseudo', user.pseudo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPseudo');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUserFromLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  console.log({context});
  return context;
};
