import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Image, { StaticImageData } from "next/image";
import { Trash } from "iconsax-reactjs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FadeLoader } from "react-spinners";

interface CartModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;

const CartModal: React.FC<CartModalProps> = ({ handleClose, animateModal }) => {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: StaticImageData | string;
  }

  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Fetch user and cart
  useEffect(() => {
    const initCart = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const userData = response.data.user;
          setUser(userData);

          if (!userData?.cart) {
            await axios.post(
              `${NEXT_PUBLIC_BASE_URL}/api/create-cart`,
              { userID: userData.id },
              { withCredentials: true }
            );
            window.location.reload();
          } else {
            setCart(userData.cart);
          }
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setNotLoggedIn(true);
        }
        setLoading(false);
      }
    };

    initCart();
  }, []);

  // Fetch cart items after cart is set
  useEffect(() => {
    if (cart.length === 0) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.post(
          `${NEXT_PUBLIC_BASE_URL}/api/cart`,
          { cartDetails: cart },
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cart]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await axios.delete(
        `${NEXT_PUBLIC_BASE_URL}/api/cart/${itemId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        toast.success("Item removed from cart", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to remove item from cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[999] flex font-poppins">
      <ToastContainer />

      {/* Overlay */}
      <div
        className={`fixed inset-0 transition-opacity ${
          animateModal ? "opacity-70 bg-black" : "opacity-0 bg-black"
        } duration-300`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full bg-white w-full md:w-[40%] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-initial ${
          animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 w-full border-b-2 border-gray-100 pb-4">
          <h2 className="text-lg font-medium flex-1 text-left">Cart</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition duration-200 transform hover:rotate-180"
            aria-label="Close"
          >
            <IoMdClose color="#000" size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          {notLoggedIn ? (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-500 gap-2">
              <p className="text-sm md:text-base">
                Please log in to view your cart.
              </p>
              <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-[#b970a0] transition duration-300">
                Log In
              </button>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-[80vh]">
              <FadeLoader color="#dcaed0" height={10} width={5} />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-500 gap-2">
              <p className="text-sm md:text-base">
                Your cart is currently empty.
              </p>
              <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-[#b970a0] transition duration-300">
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-4 w-full"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-2xl w-16 h-16 object-cover mr-4"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-md md:text-lg font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-gray-500">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs md:text-gray-500">
                        Size: {item.size}
                      </p>
                      <p className="text-xs md:text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:scale-105 transition duration-300"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}

              {/* Total and Checkout Section */}
              <div className="mt-6 border-t-2 border-gray-100 pt-4 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Total:</h3>
                  <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-[#b970a0] transition duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
