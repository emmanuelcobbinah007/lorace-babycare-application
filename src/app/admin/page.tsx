import React from 'react'
import AdminLayout from '../layouts/AdminLayout'

const page = () => {
  return (
    <AdminLayout>
    <div>
        <div className="my-8 mx-auto w-[90%] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
        </div>
      </div>
    </AdminLayout>
  )
}

export default page