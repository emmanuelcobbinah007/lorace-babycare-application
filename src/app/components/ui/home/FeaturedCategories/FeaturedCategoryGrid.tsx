"use client";

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  // Animation variants for the container and cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };
  const hoverVariants = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className='w-[80%] my-4 md:my-10 mx-auto grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
    {/* Top Left Image */}
    <motion.div 
    onClick={() => categories[5] && router.push(`/category/${categories[5].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
  {/* Image */}
  <Image 
    src={Baby1} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  {/* Text */}
  <motion.div 
    className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}
    variants={labelVariants}
    initial="hidden"
    animate="visible"
  >
    Diapering
  </motion.div>
</motion.div>
 {/* Large Centerpiece Image - Desktop Only */}
    <motion.div
    onClick={() => categories[4] && router.push(`/category/${categories[4].id}`)}
    className='group hidden md:block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[94vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
  {/* Image */}
  <Image 
    src={Baby5} 
    alt="Baby Bump" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  {/* Text */}
  <motion.div 
    className={`absolute bottom-2 left-2 bg-white/90 text-md px-3 py-1 rounded-full font-medium transition-opacity duration-500`}
    variants={labelVariants}
    initial="hidden"
    animate="visible"
  >
  Maternity and Nursing
  </motion.div>
</motion.div>    {/* Top Right Image */}
    <motion.div
    onClick={() => categories[1] && router.push(`/category/${categories[1].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
  {/* Image */}
  <Image 
    src={Baby2} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  {/* Text */}
  <motion.div 
    className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}
    variants={labelVariants}
    initial="hidden"
    animate="visible"
  >
    Feeding
  </motion.div>
</motion.div> {/* Centerpiece Image - Mobile Only */}
    <motion.div
        onClick={() => categories[4] && router.push(`/category/${categories[4].id}`)}
    className='md:hidden block col-span-4 row-span-[6] relative overflow-hidden rounded-2xl shadow-md bg-[#f2fbfe] h-[40vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
      <Image src={Baby5} alt="Baby Bump" layout="fill" objectFit="cover" />
      <motion.div 
        className="absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500"
        variants={labelVariants}
        initial="hidden"
        animate="visible"
      >
        Maternity and Nursing
      </motion.div>
    </motion.div>    {/* Bottom Left Image */}
    <motion.div
    onClick={() => categories[0] && router.push(`/category/${categories[0].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
  {/* Image */}
  <Image 
    src={Baby3} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  {/* Text */}
  <motion.div 
    className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}
    variants={labelVariants}
    initial="hidden"
    animate="visible"
  >
    Clothing and Footwear
  </motion.div>
</motion.div>    {/* Bottom Right Image */}
    <motion.div
    onClick={() => categories[2] && router.push(`/category/${categories[2].id}`)}
    className='group col-span-2 row-span-[3] relative overflow-hidden rounded-2xl shadow-sm bg-[#fef6fa] h-[30vh] md:h-[45vh] cursor-pointer'
    variants={cardVariants}
    whileHover={hoverVariants}
    whileTap={{ scale: 0.98 }}
    >
  {/* Image */}
  <Image 
    src={Baby4} 
    alt="Baby Diapers" 
    layout="fill" 
    objectFit="cover" 
    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  {/* Text */}
  <motion.div 
    className={`absolute bottom-2 left-2 bg-white/90 text-sm px-3 py-1 rounded-full font-medium transition-opacity duration-500`}
    variants={labelVariants}
    initial="hidden"
    animate="visible"
  >
    Babycare
  </motion.div>
</motion.div>
  
  </motion.div>
  
  )
}

export default FeaturedCategoryGrid