import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Math.floor(Math.random() * 10) + 1;
    const baseUrl = process.env.VITE_API_URL;

    if (!baseUrl) {
      console.error('VITE_API_URL is not defined in the environment');
      setLoading(false);
      return;
    }

    axios
      .get(`${baseUrl}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
