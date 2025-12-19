import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
  [key: string]: any;
}

export function useStore<T = User>() {
  const [dataUser, setDataUser] = useState<T | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('loggedUser');
    try {
      return savedUser ? (JSON.parse(savedUser) as T) : null;
    } catch (error) {
      console.error('Lỗi parse JSON từ localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    if (dataUser) {
      localStorage.setItem('loggedUser', JSON.stringify(dataUser));
    } else {
      localStorage.removeItem('loggedUser');
    }
  }, [dataUser]);

  return { dataUser, setDataUser };
}
