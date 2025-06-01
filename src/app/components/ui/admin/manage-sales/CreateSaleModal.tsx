import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { SearchNormal } from "iconsax-reactjs";
import { useCreateSale, useRemoveSale } from "../../../../hooks/useProducts";
import { Product } from "../../../../api/products/productApi";

const CreateSaleModal = ({
  fetchedProducts,
  animateModal,
  setAnimateModal,
  setShowModal,
  editing,
  setEditing,
  productOnSale,
}: {
  fetchedProducts: Product[];
  animateModal: boolean;
  setAnimateModal: (animate: boolean) => void;
  setShowModal: (show: boolean) => void;
  editing: boolean;
  setEditing: (show: boolean) => void;
  productOnSale: Product | null;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newSalePercent, setNewSalePercent] = useState<number | null>(null);
  const createSaleMutation = useCreateSale();
  const removeSaleMutation = useRemoveSale();
  const submitting = createSaleMutation.isPending || removeSaleMutation.isPending;

  useEffect(() => {
    if (editing && productOnSale) {
      setSelectedProduct(productOnSale);
      setNewSalePercent(productOnSale.salePercent);
    }
  }, [editing, productOnSale]);
  const handleClose = () => {
    setAnimateModal(false);
    setEditing(false);
    setTimeout(() => setShowModal(false), 300);
  };
  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    product: Product | null,
    salePercent: number | null
  ) => {
    e.preventDefault();

    if (!product) {
      toast.error("Please select a product");
      return;
    }

    if (salePercent === null || salePercent <= 0 || salePercent >= 1) {
      toast.error("Please enter a valid sale percent (1-99)");
      return;
    }

    try {
      await createSaleMutation.mutateAsync({
        productId: product.id,
        data: {
          product: product,
          salePercent: salePercent,
        },
      });

      toast.success("Sale created successfully");
      
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error("Failed to create sale:", error);
      toast.error("Failed to create sale. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="fixed inset-0 z-50 flex font-poppins">
        {/* Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            animateModal
              ? "bg-black/30 backdrop-blur-sm"
              : "bg-transparent backdrop-blur-0"
          }`}
          onClick={handleClose}
        ></div>
        <div
          className={`fixed right-0 top-0 h-full bg-white w-[90%] md:w-[400px] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-300 ease-in-out ${
            animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editing ? "Edit Sale" : "Create Sale"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 transition duration-200"
            >
              <IoClose size={24} />
            </button>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e, selectedProduct, newSalePercent)}
          >
            <div className="mb-4">
              <label
                htmlFor="product-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="product-select"
                  value={selectedProduct?.name}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  className="block w-full rounded-lg border border-gray-300 shadow-md focus:border-[#4fb3e5] focus:ring-[#4fb3e5] sm:text-sm p-2 text-gray-600"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const actualSearchValue = searchValue.toLowerCase().trim();
                    if (actualSearchValue) {
                      const matchedProduct = fetchedProducts.find((product) =>
                        product.name.toLowerCase().includes(actualSearchValue)
                      );

                      if (!matchedProduct) {
                        toast.error("Product not found");
                      } else {
                        setSelectedProduct(matchedProduct || null);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-[#4fb3e5] text-white rounded-lg shadow-md hover:bg-[#3da5d6] transition duration-200"
                >
                  <SearchNormal
                    className="text-gray-400"
                    size={20}
                    color="#fff"
                  />
                </button>
              </div>
            </div>
            <div className="mb-4 mt-4">
              <label
                htmlFor="product-price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Price
              </label>
              <input
                type="text"
                id="product-price"
                value={`GH₵${selectedProduct?.price || ""}`}
                readOnly
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md focus:border-[#4fb3e5] focus:ring-[#4fb3e5] sm:text-sm p-2 bg-gray-100 text-gray-600"
              />
            </div>
            <div className="mb-4 mt-4">
              <label
                htmlFor="sale-percent"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sale Percent
              </label>
              <input
                max={100}
                min={0}
                type="number"
                id="sale-percent"
                value={
                  selectedProduct?.salePercent
                    ? selectedProduct.salePercent * 100
                    : ""
                }
                onChange={(e) => {
                  const salePercent = parseFloat(e.target.value) / 100;
                  if (selectedProduct) {
                    setSelectedProduct({
                      ...selectedProduct,
                      salePercent: isNaN(salePercent) ? 0 : salePercent,
                    });
                  }

                  setNewSalePercent(isNaN(salePercent) ? null : salePercent);

                  console.log(
                    `New Sale Percent: ${isNaN(salePercent) ? 0 : salePercent}`
                  );
                }}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md focus:border-[#4fb3e5] focus:ring-[#4fb3e5] sm:text-sm p-2 text-gray-600"
              />
            </div>

            <div className="mb-4 mt-4">
              <label
                htmlFor="new-price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Discount
              </label>
              <input
                type="number"
                id="new-price"
                value={
                  selectedProduct
                    ? `${((selectedProduct.salePercent ?? 0) * selectedProduct.price).toFixed(2)}`
                    : ""
                }
                readOnly
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md focus:border-[#4fb3e5] focus:ring-[#4fb3e5] sm:text-sm p-2 bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-4 mt-4">
              <label
                htmlFor="new-price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Price
              </label>
              <input
                type="number"
                id="new-price"
                value={
                  selectedProduct
                    ? `${((1 - (selectedProduct.salePercent ?? 0)) * selectedProduct.price).toFixed(2)}`
                    : ""
                }
                readOnly
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md focus:border-[#4fb3e5] focus:ring-[#4fb3e5] sm:text-sm p-2 bg-gray-100 text-gray-600"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 my-2 ${
                  submitting
                    ? "bg-[#aee3f9]"
                    : "bg-[#4fb3e5] hover:bg-[#3a92c5]"
                }  w-full text-white rounded-2xl shadow-md transition duration-300`}
              >
                {submitting ? "Adding Sale..." : "Add Sale"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSaleModal;
