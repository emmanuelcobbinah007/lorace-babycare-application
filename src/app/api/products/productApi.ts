import axios from 'axios';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface Product {
  id: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  stock: number;
  isHidden: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    isHidden: boolean;
  };
  subCategoryId: string;
  subCategory: {
    id: string;
    name: string;
    categoryId: string;
    createdAt: string;
    isHidden: boolean;
  };
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  salePercent: number;
  sizingType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  productId: string;
}

export interface CreateProductData {
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  stock: number;
  categoryId: string;
  subCategoryId: string;
  sizingType: string;
  isHidden?: boolean;
}

export interface UpdateProductData {
  name?: string;
  descriptionShort?: string;
  descriptionLong?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  subCategoryId?: string;
  sizingType?: string;
  isHidden?: boolean;
}

export interface SaleData {
  product: Product;
  salePercent: number;
}

export interface FeaturedProduct {
  id: string;
  product: Product;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// Read operations
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
    throw new Error('Failed to fetch product');
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
    }
    throw new Error('Failed to fetch products by category');
  }
};

export const fetchProductsBySubCategory = async (subCategoryId: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products`, {
      params: { subCategoryId }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by subcategory');
    }
    throw new Error('Failed to fetch products by subcategory');
  }
};

// Admin CRUD operations
export const createProduct = async (productData: CreateProductData): Promise<Product> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/products`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (id: string, productData: UpdateProductData): Promise<Product> => {
  try {
    const response = await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;

    // const response = productData;
    // return response as Product; // Assuming the response is of type Product
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
    throw new Error('Failed to delete product');
  }
};

export const hideProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`, 
      { isHidden: true },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to hide product');
    }
    throw new Error('Failed to hide product');
  }
};

export const showProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      { isHidden: false },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to show product');
    }
    throw new Error('Failed to show product');
  }
};

// Sale operations
export const createSale = async (productId: string, saleData: SaleData): Promise<Product> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}/sale`, saleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create sale');
    }
    throw new Error('Failed to create sale');
  }
};

export const removeSale = async (productId: string): Promise<Product> => {
  try {
    const response = await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}/sale`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to remove sale');
    }
    throw new Error('Failed to remove sale');
  }
};

// Image operations
export const fetchProductImages = async (productId: string): Promise<ProductImage[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}/images`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product images');
    }
    throw new Error('Failed to fetch product images');
  }
};

export const uploadProductImage = async (productId: string, imageUrl: string): Promise<ProductImage> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}/images`, 
      { url: imageUrl },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to upload product image');
    }
    throw new Error('Failed to upload product image');
  }
};

export const deleteProductImage = async (imageId: string): Promise<void> => {
  try {
    await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/products/images/${imageId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete product image');
    }
    throw new Error('Failed to delete product image');
  }
};

// Featured Products operations
export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products/featured-products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
    throw new Error('Failed to fetch featured products');
  }
};

export const addToFeatured = async (productId: string): Promise<FeaturedProduct> => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/products/featured-products`, 
      { productId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to add product to featured');
    }
    throw new Error('Failed to add product to featured');
  }
};

export const removeFromFeatured = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/products/featured-products/${productId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to remove product from featured');
    }
    throw new Error('Failed to remove product from featured');
  }
};
