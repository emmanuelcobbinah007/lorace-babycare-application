"use client";

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {ArrowRight2} from 'iconsax-reactjs';
import Image from 'next/image'
import { Patrick_Hand } from 'next/font/google';

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-patrickHand',
})

// importing images
import Baby1 from "../../../../../../public/images/babyClothe.jpg"
import Baby2 from "../../../../../../public/images/babyFood.jpg"
import Baby4 from "../../../../../../public/images/babyShop.jpg"
import Baby5 from "../../../../../../public/images/babyDiapers.jpg"
import Baby6 from "../../../../../../public/images/babyMum.jpg"
import Baby7 from "../../../../../../public/images/babyAccessories.jpg"
import Baby8 from "../../../../../../public/images/babySchool.jpg"

const HeroSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const autoplay = useCallback(() => {
        if (!emblaApi) return
    
        const interval = setInterval(() => {
          if (!emblaApi) return
          emblaApi.scrollNext()
        }, 7000) // ← This is the slide duration in ms (5000ms = 5 seconds)
    
        return () => clearInterval(interval)
      }, [emblaApi])


      useEffect(() => {
        const stop = autoplay()
        return stop
      }, [autoplay])


    const slides = [
        { id: 1, image: Baby4, main: 'All baby must-haves in one spot.', tagline: 'Everything Your Baby Needs', slug: '/babycare', mobilePositionClass: 'object-right', textPositionClass: 'left-4 md:left-10', mobileTextPositionClass: 'translate-y-[10%] md:translate-y-0',},
        { id: 2, image: Baby5, main: 'Diaper solutions for day and night', tagline: 'Soft, Snug & Leak-Free', slug: '/store', mobilePositionClass: 'object-center', textPositionClass: 'right-4 md:right-10', mobileTextPositionClass: 'translate-y-[35%] md:translate-y-0',},
        { id: 3, image: Baby2, main: 'Tasty, healthy meals for your baby.', tagline: 'Tiny Bites, Big Smiles', slug: '/food', mobilePositionClass: 'object-right', textPositionClass: 'left-4 md:left-10', mobileTextPositionClass: 'translate-y-[0%] md:translate-y-0',},
        { id: 4, image: Baby1, main: 'Adorable outfits for every tiny moment.', tagline: 'Soft, Snuggly Styles', slug: '/clothing', mobilePositionClass: 'object-center' , textPositionClass: 'right-4 md:right-10', mobileTextPositionClass: 'translate-y-[30%] md:translate-y-0'},
        { id: 5, image: Baby7, main: 'Add charm with lovely baby accessories.', tagline: 'Cute Little Extras', slug: '/accessories', mobilePositionClass: 'object-right' , textPositionClass: 'right-4 md:right-10', mobileTextPositionClass: 'translate-y-[10%] md:translate-y-0'},
        { id: 6, image: Baby8, main: 'School gear for little achievers', tagline: 'Ready, Set, Learn!', slug: '/back-to-school', mobilePositionClass: 'object-center', textPositionClass: 'left-4 md:left-10', mobileTextPositionClass: 'translate-y-[30%] md:translate-y-0'},
        { id: 7, image: Baby6, main: 'Essentials to support every mom.', tagline: 'Care for Mama Too', slug: '/mama', mobilePositionClass: 'object-center' , textPositionClass: 'left-4 md:left-10', mobileTextPositionClass: 'translate-y-[0%] md:translate-y-0',},
    ]

  return (
    <>
    <div className="py-[30px] md:py-[40px] bg-white"></div>
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[60vh] md:h-[87vh] flex items-center justify-center">
            <Image
              src={slide.image}
              alt={slide.tagline}
              fill
              className={`object-cover ${slide.mobilePositionClass} md:${slide.mobilePositionClass} brightness-100`}
              priority
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className={`absolute ${slide.textPositionClass} text-center text-white px-4 ${slide.mobileTextPositionClass}`}>
              <p className="text-md md:text-lg font-[500] text-black">{slide.tagline}</p>
              <h2 className={`text-3xl md:text-5xl font-bold text-black my-2 ${patrickHand.className}`}>{slide.main}</h2>
              <a
                href={slide.slug}
                className="inline-block mt-4 px-4 py-2 bg-black text-white text-sm md:text-base font-medium rounded-3xl hover:bg-[#b970a0] transition duration-300"
              >
                <div className='flex items-center justify-center'>
                Shop Now <ArrowRight2 className="inline-block ml-1" size="20" color="white" />
                </div>
              </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>

  )
}

export default HeroSection