"use client";

import React, { useState, useEffect } from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";
import CreateSaleModal from "../../components/ui/admin/manage-sales/CreateSaleModal";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface Product {
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

const page = () => {
  const [productOnSale, setProductOnSale] = useState<Product | null>(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [productsOnSale, setProductsOnSale] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/products`
        );
        setFetchedProducts(response.data);
        // Filter products that are on sale
        setProductsOnSale(
          response.data.filter((product: Product) => product.salePercent > 0.0)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const initEdit = (product: Product) => {
    setProductOnSale(product);
    setEditing(true);
    handleOpen();
  };

  const initDelete = async (product: Product) => {

    if (!product) {
      toast.error("Please select a product");
      return;
    }

    try {
      const data = {
        product: product,
        salePercent: 0.0,
      };

      const response = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/products/${product.id}/sale`,
        data,
        {
          withCredentials: true,
        }
      );

        if (response.status < 200 || response.status >= 300) {
          console.error("Failed to create sale");
        }

      console.log(response.data);
      setProductsOnSale((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
      toast.success("Sale removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove sale");
    } 
  };

  return (
    <AdminLayout>
      <div className="flex">
        <ToastContainer />
        <div className="hidden md:block w-[22.5%] bg-amber-950"></div>
        <div className="flex flex-col w-[100%] bg-[#f2fbfe]">
          <div className="my-8 mx-auto px-8 w-full flex flex-row md:items-center justify-between gap-4">
            <h1 className="pl-8 text-xl font-semibold text-gray-800">
              Manage Sales
            </h1>

            <div className="hidden relative md:block w-full md:w-[40%]">
              <input
                type="text"
                placeholder="Search product sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b970a0] transition"
              />
              <IoPricetagsOutline
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <button
              onClick={handleOpen}
              className="bg-[#b970a0] hover:cursor-none hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow md:w-auto flex items-center space-x-2"
            >
              <IoPricetagsOutline className="mx-auto md:mr-1 text-lg font-bold" />
              <span className="hidden sm:inline">Create New Sale</span>
            </button>
          </div>

          {loading ? (
            <div className="flex h-[75vh] justify-center items-center mt-10">
              <FadeLoader color="#b970a0" />
            </div>
          ) : productsOnSale.length > 0 ? (
            <div className="w-[95%] md:w-[75%] mx-auto mt-10">
              <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                <table className="w-full min-w-[600px] table-auto text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-center font-semibold w-[25%]">
                        Product
                      </th>
                      <th className="px-6 py-4 text-center font-semibold w-[15%]">
                        Price
                      </th>
                      <th className="px-6 py-4 text-center font-semibold w-[15%]">
                        Sale Percent
                      </th>
                      <th className="px-6 py-4 text-center font-semibold w-[20%]">
                        New Price
                      </th>
                      <th className="px-6 py-4 text-center font-semibold w-[25%]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsOnSale.map((productOnSale) => (
                      <tr
                        key={productOnSale.id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-3 text-center font-medium text-gray-800">
                          {productOnSale.name}
                        </td>
                        <td className="px-6 py-3 text-center text-gray-600">
                          GH₵{productOnSale.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-3 text-center text-gray-600">
                          {(productOnSale.salePercent * 100).toFixed(2)}%
                        </td>
                        <td className="px-6 py-3 text-center text-gray-600">
                          GH₵
                          {productOnSale.price - parseFloat(
                            (productOnSale.salePercent * productOnSale.price).toFixed(2)
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => initEdit(productOnSale)}
                              className="p-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition-transform hover:scale-105"
                              title="Edit"
                            >
                              <MdOutlineEdit
                                size={18}
                                className="text-[#4fb3e5]"
                              />
                            </button>
                            <button
                              onClick={() => initDelete(productOnSale)}
                              className="p-2 rounded-lg bg-red-500 text-white shadow-sm hover:bg-red-600 transition-transform hover:scale-105"
                              title="Delete"
                            >
                              <MdOutlineDeleteOutline size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-[90%] mx-auto mt-8">
              <h2 className="text-xl font-semibold stext-gray-800">
                No Sales Found
              </h2>
              <p className="text-gray-500">There are no sales ongoing.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CreateSaleModal
        fetchedProducts={fetchedProducts}
          // subCategories={subCategories}
          editing={editing}
          // editId={editId}
          setEditing={setEditing}
          setShowModal={setShowModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          productOnSale={productOnSale || null}
          // setSubCategories={setSubCategories}
          // setFilteredSubCategories={setFilteredSubCategories}
        />
      )}
    </AdminLayout>
  );
};

export default page;
