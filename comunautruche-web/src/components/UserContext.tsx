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

  // Recharger l'utilisateur depuis localStorage au chargement
  useEffect(() => {
    const storedUsername = localStorage.getItem('userEmail');
    const storedPseudo = localStorage.getItem('userPseudo');

    if (storedUsername && storedPseudo) {
      setUser({
        username: storedUsername,
        pseudo: storedPseudo,
      });
    }
  }, []);  // Le tableau vide assure que cela se fait uniquement au premier rendu

  const setUserFromLogin = (user: AuthenticatedUser) => {
    setUser(user);
    console.log({user});
    localStorage.setItem('userEmail', user.username);
      localStorage.setItem('userPseudo', user.pseudo);
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPseudo');
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
  return context;
};
