import axios from 'axios';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
  cartId: string;
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    images: Array<{ id: string; url: string; alt: string }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  size?: string;
}

export interface UpdateCartItemData {
  quantity: number;
}

// Cart API
export const fetchCart = async (): Promise<Cart> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createCart = async (): Promise<Cart> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/create-cart`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addToCart = async (cartData: AddToCartData): Promise<CartItem> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/cart`, cartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateCartItem = async (itemId: string, updateData: UpdateCartItemData): Promise<CartItem> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/cart/${itemId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/cart/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
