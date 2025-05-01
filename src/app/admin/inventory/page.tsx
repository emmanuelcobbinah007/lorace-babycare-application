import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import InventoryPage from "@/app/components/ui/admin/inventory/InventoryPage";

const page = () => {
  return (
    <AdminLayout>
      <InventoryPage />
    </AdminLayout>
  );
};

export default page;
