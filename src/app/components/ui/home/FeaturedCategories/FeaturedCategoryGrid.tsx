"use client";

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useCategories } from '../../../../hooks/useCategories';

// importing images
import Baby1 from "../../../../../../public/images/side-view-parent-holding-diaper.jpg"
import Baby2 from "../../../../../../public/images/flat-lay-bowl-with-baby-food.jpg"
import Baby3 from "../../../../../../public/images/baby-clothes.jpg"
import Baby4 from "../../../../../../public/images/black-mother-taking-car-her-child.jpg"
import Baby5 from "../../../../../../public/images/babyBump.jpg"

interface SubCategory {
  categoryId: string;
  createdAt: string;
  id: string;
  isHidden: boolean;
  name: string;
}

interface fetchedCategories {
  createdAt: string;
  id: string;
  name: string;
  subCategories: SubCategory[];
}

const FeaturedCategoryGrid = () => {
  const { data: categories = [], isLoading, error } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-[80%] my-4 md:my-10 mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[80%] my-4 md:my-10 mx-auto flex justify-center items-center h-64">
        <p className="text-gray-500">Error loading categories</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-[80%] my-4 md:my-10 mx-auto flex justify-center items-center h-64">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }


  return (
    <div className='w-[80%] my-4 md:my-10 mx-auto grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6'>
    {/* Top Left Image */}
    <div 
    onClick={() => categories[5] && router.push(`/category/${categories[5].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
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
    <div
    onClick={() => categories[4] && router.push(`/category/${categories[4].id}`)}
    className='group hidden md:block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[94vh]'>
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
    <div
    onClick={() => categories[1] && router.push(`/category/${categories[1].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
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
    <div
        onClick={() => categories[4] && router.push(`/category/${categories[4].id}`)}
    className='md:hidden block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[40vh]'>
      <Image src={Baby5} alt="Baby Bump" layout="fill" objectFit="cover" />
      <div className="absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500">Maternity and Nursing</div>
    </div>
    {/* Bottom Left Image */}
    <div
    onClick={() => categories[0] && router.push(`/category/${categories[0].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
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
    <div
    onClick={() => categories[2] && router.push(`/category/${categories[2].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh]'>
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