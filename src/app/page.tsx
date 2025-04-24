"use client";

import React from 'react'

import HeaderBar from './components/ui/home/Header/HeaderBar';
import HeroSection from './components/ui/home/Hero/HeroSection'
import Break from './components/ui/home/Break/Break'
import FeaturedCategoryGrid from './components/ui/home/FeaturedCategories/FeaturedCategoryGrid'
import FeaturedProducts from './components/ui/home/FeaturedProducts/FeaturedProducts'
import Review from './components/ui/home/Review/Review';
import Footer from './components/ui/Footer/Footer'

const page = () => {
  return (
    <div>
      <HeaderBar />
      <HeroSection />
      <Break />
      <FeaturedCategoryGrid />
      <FeaturedProducts />
      <Review />
      <Footer /> 
    </div>
  )
}

export default page