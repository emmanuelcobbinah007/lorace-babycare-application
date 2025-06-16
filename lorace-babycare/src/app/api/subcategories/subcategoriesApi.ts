// Subcategories API functions
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  isHidden: boolean;
  categoryId: string;
  category: {
    name: string;
  };
}

export interface CreateSubCategoryData {
  name: string;
  categoryId: string;
}

export interface UpdateSubCategoryData {
  name: string;
  categoryId: string;
}

export interface UpdateVisibilityData {
  hiddenContent: boolean;
}

// Get all subcategories
export const getSubCategories = async (): Promise<SubCategory[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/subcategories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch subcategories');
    }
    throw new Error('Failed to fetch subcategories');
  }
};

// Get a single subcategory
export const getSubCategory = async (id: string): Promise<SubCategory> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/subcategories/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch subcategory');
    }
    throw new Error('Failed to fetch subcategory');
  }
};

// Create a new subcategory
export const createSubCategory = async (data: CreateSubCategoryData): Promise<SubCategory> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/subcategories`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create subcategory');
    }
    throw new Error('Failed to create subcategory');
  }
};

// Update a subcategory
export const updateSubCategory = async (id: string, data: UpdateSubCategoryData): Promise<SubCategory> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/subcategories/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update subcategory');
    }
    throw new Error('Failed to update subcategory');
  }
};

// Update subcategory visibility
export const updateSubCategoryVisibility = async (id: string, data: UpdateVisibilityData): Promise<SubCategory> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/subcategories/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update subcategory visibility');
    }
    throw new Error('Failed to update subcategory visibility');
  }
};

// Delete a subcategory
export const deleteSubCategory = async (id: string): Promise<SubCategory> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/subcategories/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete subcategory');
    }
    throw new Error('Failed to delete subcategory');
  }
};
