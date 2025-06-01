import axios from 'axios';

const NEXT_PUBLIC_ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: 'USER' | 'ADMIN';
  emailIsVerified?: boolean;
  phoneIsVerified?: boolean;
  createdAt: string;
  cart?: any;
  orders?: any[];
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

export interface SubscribeData {
  email: string;
  id?: string;
}

// Auth API
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
    throw new Error('Failed to get current user');
  }
};

export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_ROOT_URL}/api/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};

export const signUp = async (userData: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_ROOT_URL}/api/auth/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Sign up failed');
    }
    throw new Error('Sign up failed');
  }
};

export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
    throw new Error('Logout failed');
  }
};

// Subscription API
export const subscribe = async (subscribeData: SubscribeData): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_ROOT_URL}/api/subscribe`, subscribeData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Subscription failed');
    }
    throw new Error('Subscription failed');
  }
};

export const checkSubscription = async (email: string): Promise<{ isSubscribed: boolean }> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/subscribe/check`, {
      params: { email },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to check subscription');
    }
    throw new Error('Failed to check subscription');
  }
};
