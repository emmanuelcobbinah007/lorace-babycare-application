import React from 'react'
import axios from 'axios';

interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    isVerified: boolean;
    verificationToken: string | null;
    createdAt: string;
  }

  interface UserProfileProps {
    user: User | null;
    setLoggedIn: (loggedIn: boolean) => void;
    setUser: (user: User | null) => void;
  }

  const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000";

const UserProfile: React.FC<UserProfileProps> = ({ user, setLoggedIn, setUser }) => {
    const initLogout = async () => {
        await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/logout`,
            {
              withCredentials: true,
            });
      
          setLoggedIn(false);
          setUser(null);
    };

    return (
        <>
            <div>{user ? `${user.firstname}` : 'Guest'}</div>
            <button onClick={initLogout}>Logout</button>
        </>
    )
}

export default UserProfile