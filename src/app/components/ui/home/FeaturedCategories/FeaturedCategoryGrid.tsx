import React from 'react'
import Image from 'next/image'

// importing images
import Baby1 from "../../../../../../public/images/babyDiapers.jpg"
import Baby2 from "../../../../../../public/images/babyFood.jpg"
import Baby3 from "../../../../../../public/images/babyShoes.jpg"
import Baby4 from "../../../../../../public/images/babyShop.jpg"
import Baby5 from "../../../../../../public/images/babyBump.jpg"

const FeaturedCategoryGrid = () => {
  return (
    <div className='w-[90%] my-4 md:my-10 mx-auto grid grid-cols-4 md:grid-cols-8 grid-rows-12 gap-2 md:gap-8'>
        {/* Left side: 4 items in 2x2 grid */}
        <div className='col-span-2 row-span-[3] bg-gray-200 h-full'>
          <Image src={Baby1} alt="Baby Diapers" layout="responsive" />
        </div>
        <div className='col-span-2 row-span-[3] bg-gray-200 h-full'>
          <Image src={Baby2} alt="Baby Food" layout="responsive" />
        </div>
        <div className='hidden md:block col-span-4 row-span-[6] bg-gray-400 h-full'>
          <Image src={Baby5} alt="Baby Bump" layout="responsive" />
        </div>
        <div className='col-span-2 row-span-[3] bg-gray-200 h-full'>
          <Image src={Baby3} alt="Baby Shoes" layout="responsive" />
        </div>
        <div className='col-span-2 row-span-[3] bg-gray-200 h-full'>
          <Image src={Baby4} alt="Baby Shop" layout="responsive" />
        </div>
        <div className='md:hidden block col-span-4 row-span-[6] bg-gray-400 h-full'>
          <Image src={Baby5} alt="Baby Bump" layout="responsive" />
        </div>
        {/* Right side: 1 item spanning 2 columns and 2 rows */}
    </div>
  )
}

export default FeaturedCategoryGrid