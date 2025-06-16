import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { 
  getSubCategories, 
  getSubCategory, 
  createSubCategory, 
  updateSubCategory, 
  updateSubCategoryVisibility, 
  deleteSubCategory,
  SubCategory,
  CreateSubCategoryData,
  UpdateSubCategoryData,
  UpdateVisibilityData
} from '../api/subcategories/subcategoriesApi';

// Hook to get all subcategories
export const useSubCategories = () => {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: getSubCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get a single subcategory
export const useSubCategory = (id: string) => {
  return useQuery({
    queryKey: ['subcategory', id],
    queryFn: () => getSubCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to create a subcategory
export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubCategory,
    onSuccess: (newSubCategory) => {
      // Update the cache by adding the new subcategory
      queryClient.setQueryData(['subcategories'], (oldData: SubCategory[] | undefined) => {
        if (!oldData) return [newSubCategory];
        return [...oldData, newSubCategory];
      });
      
      toast.success('Subcategory created successfully!', {
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
      console.error('Error creating subcategory:', error);
      toast.error(error.message || 'Failed to create subcategory', {
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

// Hook to update a subcategory
export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubCategoryData }) => 
      updateSubCategory(id, data),
    onSuccess: (updatedSubCategory) => {
      // Update the cache
      queryClient.setQueryData(['subcategories'], (oldData: SubCategory[] | undefined) => {
        if (!oldData) return [updatedSubCategory];
        return oldData.map(subCat => 
          subCat.id === updatedSubCategory.id ? updatedSubCategory : subCat
        );
      });
      
      // Also update individual subcategory cache
      queryClient.setQueryData(['subcategory', updatedSubCategory.id], updatedSubCategory);
      
      toast.success('Subcategory updated successfully!', {
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
      console.error('Error updating subcategory:', error);
      toast.error(error.message || 'Failed to update subcategory', {
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

// Hook to update subcategory visibility
export const useUpdateSubCategoryVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVisibilityData }) => 
      updateSubCategoryVisibility(id, data),
    onSuccess: (updatedSubCategory, variables) => {
      // Update the cache
      queryClient.setQueryData(['subcategories'], (oldData: SubCategory[] | undefined) => {
        if (!oldData) return [updatedSubCategory];
        return oldData.map(subCat => 
          subCat.id === updatedSubCategory.id 
            ? { ...subCat, isHidden: variables.data.hiddenContent }
            : subCat
        );
      });
      
      const message = variables.data.hiddenContent 
        ? 'Category hidden!' 
        : 'Category unhidden!';
      
      toast.success(message, {
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
      console.error('Error updating subcategory visibility:', error);
      toast.error('Failed to update category visibility. Please try again.', {
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

// Hook to delete a subcategory
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: (deletedSubCategory) => {
      // Update the cache by removing the deleted subcategory
      queryClient.setQueryData(['subcategories'], (oldData: SubCategory[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(subCat => subCat.id !== deletedSubCategory.id);
      });
      
      // Remove individual subcategory cache
      queryClient.removeQueries({ queryKey: ['subcategory', deletedSubCategory.id] });
    },
    onError: (error: Error) => {
      console.error('Error deleting subcategory:', error);
      toast.error('Failed to delete subcategory. Please try again.', {
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
