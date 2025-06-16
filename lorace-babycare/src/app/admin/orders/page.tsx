import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const page = () => {
  return (
    <>
        <AdminLayout>
        <div className='flex'>
        <div className='w-[22.5%] bg-amber-950'></div>
        <div className="my-8 mx-auto px-8 w-[90%] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Orders & Fulfillment</h1>
        </div>
      </div>
        </AdminLayout>
    </>
  )
}

export default page