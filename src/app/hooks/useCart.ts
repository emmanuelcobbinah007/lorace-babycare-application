import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCart,
  createCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  AddToCartData,
  UpdateCartItemData,
} from '../api/cart/cartApi';

// Cart Hooks
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1 * 60 * 1000, // 1 minute (cart data should be fresh)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry cart requests if they fail
  });
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemData }) =>
      updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
