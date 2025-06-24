"use client";

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

interface GeneralSaleModalProps {
  setShowModal: (value: boolean) => void;
  applyGeneralSale: (salePercentage: number) => void;
}

const GeneralSaleModal: React.FC<GeneralSaleModalProps> = ({ setShowModal, applyGeneralSale }) => {
  const [salePercent, setSalePercent] = useState("");

  const handleApplySale = () => {
    const salePercentNumber = parseFloat(salePercent);
    if (!salePercent || isNaN(salePercentNumber) || salePercentNumber <= 0 || salePercentNumber > 100) {
    toast.error("Please enter a valid sale percentage (1-100).");
    }
    applyGeneralSale(parseFloat(salePercent) / 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Apply General Sale</h2>
        <input
          type="number"
          placeholder="Enter sale percentage"
          min={0}
          max={100}
          value={salePercent}
          onChange={(e) => setSalePercent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleApplySale}
            className="px-4 py-2 bg-[#4fb3e5] text-white rounded-lg"
          >
            Apply Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSaleModal