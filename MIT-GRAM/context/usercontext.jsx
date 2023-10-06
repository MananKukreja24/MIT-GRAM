import axios from 'axios'
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ user: null, setUser: () => {} });

export function UserContextProvider({ children }) {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
