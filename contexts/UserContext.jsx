'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

const UserContext = createContext(null);


export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    async function fetchUser(id) {
        if(id){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        }        
    }
    fetchUser(userId);
  }, [userId]);

  useEffect(() => {
  console.log('User updated:', user);
}, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
