import axios from 'axios';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
}

export interface CreateSubCategoryData {
  name: string;
  description?: string;
  image?: string;
  categoryId: string;
}

export interface UpdateSubCategoryData {
  name?: string;
  description?: string;
  image?: string;
  categoryId?: string;
}

// Categories API
export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/categories`);
  return data;
};

export const fetchCategory = async (id: string): Promise<Category> => {
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/category/${id}`);
  return data.category;
};

export const createCategory = async (categoryData: CreateCategoryData): Promise<Category> => {
  const { data } = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/category`, categoryData);
  return data;
};

export const updateCategory = async (id: string, categoryData: UpdateCategoryData): Promise<Category> => {
  const { data } = await axios.put(`${NEXT_PUBLIC_BASE_URL}/api/category/${id}`, categoryData);
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/category/${id}`);
};

// SubCategories API
export const fetchSubCategories = async (): Promise<SubCategory[]> => {
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/subcategories`);
  return data;
};

export const fetchSubCategory = async (id: string): Promise<SubCategory> => {
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/subcategories/${id}`);
  return data;
};

export const createSubCategory = async (subCategoryData: CreateSubCategoryData): Promise<SubCategory> => {
  const { data } = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/subcategories`, subCategoryData);
  return data;
};

export const updateSubCategory = async (id: string, subCategoryData: UpdateSubCategoryData): Promise<SubCategory> => {
  const { data } = await axios.put(`${NEXT_PUBLIC_BASE_URL}/api/subcategories/${id}`, subCategoryData);
  return data;
};

export const deleteSubCategory = async (id: string): Promise<void> => {
  await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/subcategories/${id}`);
};
