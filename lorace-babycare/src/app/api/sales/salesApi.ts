import axios from 'axios';
import { Product } from '../products/productApi';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Sales API - Returns products that are on sale
export const fetchSales = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/sales`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sales');
    }
    throw new Error('Failed to fetch sales');
  }
};

export const fetchActiveSales = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/sales`, {
      params: { active: true }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch active sales');
    }
    throw new Error('Failed to fetch active sales');
  }
};
