import React from 'react'
import AdminLayout from '../layouts/AdminLayout'
// import { Bell } from 'lucide-react'
// import {Notification} from 'iconsax-reactjs'

const Page = () => {
  return (
    <AdminLayout>
      <div className='flex'>
        <div className='w-[22.5%] bg-amber-950'></div>
        <div className="my-8 mx-auto w-[90%] px-8">
        {/* Header with Bell Icon */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
        </div>
      </div>
      </div>
    </AdminLayout>
  )
}

export default Page
