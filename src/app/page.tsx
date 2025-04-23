"use client";

import React from 'react'

import HeaderBar from './components/ui/home/Header/HeaderBar';
import HeroSection from './components/ui/home/Hero/HeroSection'
import Break from './components/ui/home/Break/Break'

const page = () => {
  return (
    <div>
      <HeaderBar />
      <HeroSection />
      <Break />
    </div>
  )
}

export default page