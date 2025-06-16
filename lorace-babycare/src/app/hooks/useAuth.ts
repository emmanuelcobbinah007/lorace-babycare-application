import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCurrentUser,
  login,
  signUp,
  logout,
  subscribe,
  checkSubscription,
  LoginData,
  SignUpData,
  SubscribeData,
} from '../api/auth/authApi';

// Auth Hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry auth requests
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // Update user cache
      queryClient.setQueryData(['currentUser'], data);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // Update user cache
      queryClient.setQueryData(['currentUser'], data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Clear all cached data
      queryClient.clear();
    },
  });
};

// Subscription Hooks
export const useSubscribe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      // Invalidate current user to refresh subscription status
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Invalidate all subscription queries
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });
};

export const useCheckSubscription = (email: string) => {
  return useQuery({
    queryKey: ['subscription', email],
    queryFn: () => checkSubscription(email),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!email,
    select: (data) => data.isSubscribed, // Extract just the boolean value
  });
};
