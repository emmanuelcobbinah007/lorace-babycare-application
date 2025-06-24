import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { User } from "@/app/api/auth/authApi";

const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface UserCart {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

const checkForCart = async (userData: User): Promise<UserCart | undefined | null> => {
    try {
        if (!userData?.cart) {
            const response = await axios.post(
                `${NEXT_PUBLIC_ROOT_URL}/api/create-cart`,
                { userID: userData.id },
                { withCredentials: true }
            );
            // Instead of reloading, return the new cart directly
            return response.data.cart;
        } else {
            return userData.cart;
        }
    } catch (error) {
        console.error("Error checking cart:", error);
        return null;
    }
};

const fetchUser = async (router: AppRouterInstance, onOpenLoginModal?: () => void): Promise<User | undefined> => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/me`, {
      withCredentials: true,
    });

    return response.data.user;
  } catch (error) {
    toast.error("Please sign In to update your cart");
      if (onOpenLoginModal) {
        onOpenLoginModal();
      } else {
        router.push("/signin");
      }
  }
};

// Add function to check product stock
const checkProductStock = async (productId: string): Promise<number> => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_ROOT_URL}/api/products/${productId}`,
      { withCredentials: true }
    );
    return response.data.stock;
  } catch (error) {
    console.error("Error checking product stock:", error);
    return 0;
  }
};

export default async function addToCart(
  productId: string,
  quantity: number,
  size: string,
  router: AppRouterInstance,
  onOpenLoginModal?: () => void
) {
  // First check product stock
  const currentStock = await checkProductStock(productId);
  if (currentStock < quantity) {
    toast.error(`Sorry, only ${currentStock} items are available`);
    return;
  }

  const user = await fetchUser(router, onOpenLoginModal);
  if (!user) return;

  const cartData = await checkForCart(user);
  if (!cartData) return;

  try {
    await axios.post(
      `${NEXT_PUBLIC_ROOT_URL}/api/add-to-cart`,
      {
        productId,
        quantity,
        cartId: cartData.id,
        size,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add product to cart.");
  }
}
