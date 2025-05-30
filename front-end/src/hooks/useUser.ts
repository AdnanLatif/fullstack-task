import { useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

const useUser = () => {
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};

export default useUser;
