import React from 'react'
import Image from 'next/image'

// importing images
import Baby1 from "../../../../../../public/images/side-view-parent-holding-diaper.jpg"
import Baby2 from "../../../../../../public/images/flat-lay-bowl-with-baby-food.jpg"
import Baby3 from "../../../../../../public/images/baby-clothes.jpg"
import Baby4 from "../../../../../../public/images/black-mother-taking-car-her-child.jpg"
import Baby5 from "../../../../../../public/images/babyBump.jpg"

const FeaturedCategoryGrid = () => {
  return (
    <div className='w-[80%] my-4 md:my-10 mx-auto grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6'>


    {/* Top Left Image */}
    <div className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
  {/* Image */}
  <Image 
    src={Baby1} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* Text */}
  <div className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}>
    Diapering
  </div>
</div>


 {/* Large Centerpiece Image - Desktop Only */}
    <div className='group hidden md:block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[94vh]'>
  {/* Image */}
  <Image 
    src={Baby5} 
    alt="Baby Bump" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* Text */}
  <div className={`absolute bottom-2 left-2 bg-white/90 text-md px-3 py-1 rounded-full font-medium transition-opacity duration-500`}>
  Maternity and Nursing
  </div>
</div>

  
    {/* Top Right Image */}
    <div className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
  {/* Image */}
  <Image 
    src={Baby2} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* Text */}
  <div className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}>
    Feeding
  </div>
</div>

 {/* Centerpiece Image - Mobile Only */}
    <div className='md:hidden block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[40vh]'>
      <Image src={Baby5} alt="Baby Bump" layout="fill" objectFit="cover" />
      <div className="absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500">Maternity and Nursing</div>
    </div>
  
    {/* Bottom Left Image */}
    <div className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
  {/* Image */}
  <Image 
    src={Baby3} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* Text */}
  <div className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}>
    Clothing and Footwear
  </div>
</div>

  
    {/* Bottom Right Image */}
    <div className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
  {/* Image */}
  <Image 
    src={Baby4} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* Text */}
  <div className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}>
    Babycare
  </div>
</div>
  
  </div>
  
  )
}

export default FeaturedCategoryGrid