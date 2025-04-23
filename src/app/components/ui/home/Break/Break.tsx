// import React from 'react'

// const Break = () => {
//   return (
//     <div>Break</div>
//   )
// }

// export default Break

import { FaTruck, FaLock, FaBaby, FaHeadset } from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { Truck, Lock1 } from "iconsax-reactjs";

const Break = () => {
  return (
    <section className="py-10 h-auto flex items-center justify-center">
      <div className="w-[90%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[#f2fbfe] p-4 rounded-full hover:scale-105 transition-transform ease-in-out duration-300">
          <Truck size='35'  className="text-[#4fb3e5]" />
          </div>
          <p className="text-sm font-medium text-gray-700 my-2">Free & Fast Shipping</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[#f2fbfe] p-4 rounded-full hover:scale-105 transition-transform ease-in-out duration-300">
          <Lock1 size='35' className="text-[#4fb3e5]" />
          </div>
          <p className="text-sm font-medium text-gray-700 my-2">Secure Checkout</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[#f2fbfe] p-4 rounded-full hover:scale-105 transition-transform ease-in-out duration-300">
          <LuBaby size='35' className="text-[#4fb3e5]" />
          </div>
          <p className="text-sm font-medium text-gray-700 my-2">Parent-Approved Picks</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[#f2fbfe] p-4 rounded-full hover:scale-105 transition-transform ease-in-out duration-300">
          <FaHeadset size='35' className="text-[#4fb3e5]" />
          </div>
          <p className="text-sm font-medium text-gray-700 my-2">24/7 Support</p>
        </div>
      </div>
    </section>
  );
};

export default Break;
