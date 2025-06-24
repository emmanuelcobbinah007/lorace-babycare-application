"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useCurrentUser,
  useLogin,
  useSignUp,
  useLogout,
} from "../app/hooks/useAuth";
import { User } from "../app/api/auth/authApi";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  // Use the TanStack Query hooks
  const { data: authResponse, isLoading, error: queryError } = useCurrentUser();
  const loginMutation = useLogin();
  const signUpMutation = useSignUp();
  const logoutMutation = useLogout();

  const user = authResponse?.user || null;
  const isAuthenticated = !!user;

  // Update error state when query error changes
  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    } else {
      setError(null);
    }
  }, [queryError]);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign in failed";
      setError(errorMessage);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string
  ) => {
    try {
      setError(null);
      await signUpMutation.mutateAsync({
        email,
        password,
        firstname,
        lastname,
        phone,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign up failed";
      setError(errorMessage);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await logoutMutation.mutateAsync();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign out failed";
      setError(errorMessage);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      signUpMutation.isPending ||
      logoutMutation.isPending,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
