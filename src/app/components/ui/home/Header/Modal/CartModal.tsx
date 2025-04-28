import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import { Trash } from 'iconsax-reactjs';

import Socks from "../../../../../../../public/images/featuredProducts/socks.jpg";
import Towels from "../../../../../../../public/images/featuredProducts/towels.jpg";
import Yum from "../../../../../../../public/images/featuredProducts/yum.jpg";

interface CartModalProps {
    handleClose: () => void,
    animateModal: boolean,
}

const CartModal: React.FC<CartModalProps> = ({handleClose, animateModal}) => {
  const [emptyCart, setEmptyCart] = useState(false);
  const [cartItems, setCartItems] = useState([
    // Example cart items
    { id: 1, name: "Product 1", price: 29.99, quantity: 1, size: "M", image: Socks },
    { id: 2, name: "Product 2", price: 19.99, quantity: 1, size: "N/A", image: Towels },
    { id: 3, name: "Product 3", price: 39.99, quantity: 2, size: "L", image: Yum },
  ]);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[999] flex font-poppins">
          {/* Overlay */}
          <div
            className={`fixed inset-0 transition-opacity ${
              animateModal
                ? "opacity-70 bg-[#000] duration-300"
                : "opacity-0 bg-[#000] duration-300"
            }`}
            onClick={handleClose}
          ></div>

          {/* Sidebar */}  
          <div
            className={`fixed right-0 top-0 h-full bg-white w-full md:w-[40%] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-initial ${
              animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4 w-full border-b-2 border-gray-100 pb-4">
                        <h2 className="text-lg font-[500] flex-1 text-left">
                          Cart
                        </h2>
                        <button
                            onClick={handleClose}
                            className="p-1 rounded-full hover:bg-gray-200 transition duration-200 transform hover:rotate-180"
                            aria-label="Close"
                          >
                            <IoMdClose color="#000" size={24} />
                          </button>
                      </div>

                      <div className='flex flex-col gap-4 items-center justify-center'>
                        {cartItems.length === 0 ? (
                          <div className="text-center text-gray-500">
                            <p>Your cart is empty.</p>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                              View All Products
                            </button>
                          </div>
                        ) : (
                          cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-4 w-full">
        
                              <div className="flex items-center gap-2">
                                <Image src={item.image} alt={item.name} className="rounded-2xl w-16 h-16 object-cover mr-4" />
                                <div className="flex flex-col">
                                    <h3 className="text-md md:text-lg font-semibold">{item.name}</h3>
                                    <p className="text-xs md:text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                    <p className="text-xs md:text-gray-500">Size: {item.size}</p>
                                    <p className="text-xs md:text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition duration-300">
                                <Trash 
                                  size={20}
                                />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Total and Checkout Section */}
                      {cartItems.length > 0 && (
                        <div className="mt-6 border-t-2 border-gray-100 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Total:</h3>
                            <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
                          </div>
                          <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-[#b970a0] transition duration-300">
                            Proceed to Checkout
                          </button>
                        </div>
                      )}
          </div>
        </div>
  )
}

export default CartModal;