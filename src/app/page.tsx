"use client";

import React from 'react'
import HeroSection from './components/ui/home/Hero/HeroSection'
import Break from './components/ui/home/Break/Break'
import FeaturedCategoryGrid from './components/ui/home/FeaturedCategories/FeaturedCategoryGrid'
import FeaturedProducts from './components/ui/home/FeaturedProducts/FeaturedProducts'
import Review from './components/ui/home/Review/Review';
import Trust from './components/ui/home/Trust/Trust'

const page = () => {
  return (
    <div>
      <HeroSection />
      <Break />
      <FeaturedCategoryGrid />
      <FeaturedProducts />
      <Review />
      <Trust />
    </div>
  )
}

export default page