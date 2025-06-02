import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { 
  fetchProducts, 
  fetchProductById, 
  fetchProductsByCategory, 
  fetchProductsBySubCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  hideProduct,
  showProduct,
  createSale,
  removeSale,
  fetchProductImages,
  uploadProductImage,
  deleteProductImage,
  fetchFeaturedProducts,
  addToFeatured,
  removeFromFeatured,
  Product,
  CreateProductData,
  UpdateProductData,
  SaleData,
  ProductImage,
  FeaturedProduct
} from '../api/products/productApi';

// Query keys for consistent cache management
export const productQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productQueryKeys.lists(), { filters }] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  byCategory: (categoryId: string) => [...productQueryKeys.all, 'category', categoryId] as const,
  bySubCategory: (subCategoryId: string) => [...productQueryKeys.all, 'subcategory', subCategoryId] as const,
};

// Hook to fetch all products
export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: productQueryKeys.lists(),
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to fetch a single product by ID
export const useProduct = (id: string): UseQueryResult<Product, Error> => {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run query if id exists
    staleTime: 10 * 60 * 1000, // 10 minutes for individual products
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook to fetch products by category
export const useProductsByCategory = (categoryId: string): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: productQueryKeys.byCategory(categoryId),
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to fetch products by subcategory
export const useProductsBySubCategory = (subCategoryId: string): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: productQueryKeys.bySubCategory(subCategoryId),
    queryFn: () => fetchProductsBySubCategory(subCategoryId),
    enabled: !!subCategoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Product Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
      updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(id) });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

export const useHideProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: hideProduct,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(productId) });
    },
  });
};

export const useShowProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: showProduct,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(productId) });
    },
  });
};

// Sale Mutations
export const useCreateSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: SaleData }) =>
      createSale(productId, data),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(productId) });
    },
  });
};

export const useRemoveSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeSale,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(productId) });
    },
  });
};

// Image Hooks
export const useProductImages = (productId: string) => {
  return useQuery({
    queryKey: ['productImages', productId],
    queryFn: () => fetchProductImages(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, imageUrl }: { productId: string; imageUrl: string }) =>
      uploadProductImage(productId, imageUrl),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['productImages', productId] });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(productId) });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productImages'] });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

// Featured Products Hooks
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAddToFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addToFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featuredProducts'] });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

export const useRemoveFromFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeFromFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featuredProducts'] });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};
