"use client";

import React from 'react'

import HeaderBar from './components/ui/home/Header/HeaderBar';
import HeroSection from './components/ui/home/Hero/HeroSection'
import Break from './components/ui/home/Break/Break'
import FeaturedCategoryGrid from './components/ui/home/FeaturedCategories/FeaturedCategoryGrid'

const page = () => {
  return (
    <div>
      <HeaderBar />
      <HeroSection />
      <Break />
      <FeaturedCategoryGrid />
    </div>
  )
}

export default page