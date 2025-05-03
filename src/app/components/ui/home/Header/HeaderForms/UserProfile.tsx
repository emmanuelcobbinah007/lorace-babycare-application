"use client";

import React, { useState, useEffect } from 'react'
import axios from 'axios';

interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    emailIsVerified: boolean;
    emailVerificationToken: string | null;
    phoneIsVerified: boolean;
    phoneVerificationToken: string | null;
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
            {user && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                    <p>Email: {user?.email}</p>
                    <p>First Name: {user?.firstname}</p>
                    <p>Last Name: {user?.lastname}</p>
                    <button onClick={initLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            )}
        </>
    )
}

export default UserProfile