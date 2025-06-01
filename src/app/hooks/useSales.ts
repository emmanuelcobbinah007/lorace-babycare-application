import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  fetchSales,
  fetchActiveSales,
} from '../api/sales/salesApi';
import { useProducts, useCreateSale, useRemoveSale } from './useProducts';
import { Product, SaleData } from '../api/products/productApi';

// Sales Hooks
export const useSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: fetchSales,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useActiveSales = () => {
  return useQuery({
    queryKey: ['sales', 'active'],
    queryFn: fetchActiveSales,
    staleTime: 2 * 60 * 1000, // 2 minutes (fresher for active sales)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get products that are currently on sale from the products list
export const useProductsOnSale = () => {
  const { data: products = [], isLoading, error } = useProducts();
  
  const productsOnSale = useMemo(() => {
    return products.filter(product => product.salePercent > 0);
  }, [products]);

  return {
    data: productsOnSale,
    isLoading,
    error
  };
};

// Hook for creating sales with better error handling and success feedback
export const useCreateSaleWithFeedback = () => {
  const createSaleMutation = useCreateSale();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: SaleData }) =>
      createSaleMutation.mutateAsync({ productId, data }),
    onSuccess: () => {
      toast.success('Sale created successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: Error) => {
      console.error('Error creating sale:', error);
      toast.error('Failed to create sale. Please try again.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

// Hook for removing sales with better error handling and success feedback  
export const useRemoveSaleWithFeedback = () => {
  const removeSaleMutation = useRemoveSale();
  
  return useMutation({
    mutationFn: (productId: string) => removeSaleMutation.mutateAsync(productId),
    onSuccess: () => {
      toast.success('Sale removed successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: Error) => {
      console.error('Error removing sale:', error);
      toast.error('Failed to remove sale. Please try again.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};
