import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const page = () => {
  return (
    <>
        <AdminLayout>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">Admin Orders Page</h1>
                <p className="mt-4 text-lg text-gray-600">Manage your orders here.</p>
            </div>
        </AdminLayout>
    </>
  )
}

export default page