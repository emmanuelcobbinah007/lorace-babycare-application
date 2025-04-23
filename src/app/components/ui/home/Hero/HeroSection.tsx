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
import Baby3 from "../../../../../../public/images/babyShoes.jpg"
import Baby4 from "../../../../../../public/images/babyShop.jpg"
import Baby5 from "../../../../../../public/images/pexels-simple-soul-photogrphy-1100392298-27010370.jpg"
import Baby6 from "../../../../../../public/images/babyMum.jpg"
import Baby7 from "../../../../../../public/images/babyAccessories.jpg"

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
        { id: 1, image: Baby4, main: 'All baby must-haves in one spot.', tagline: 'Everything Your Baby Needs', slug: '/store', mobilePosition: 'right', textPosition: 'left', mobileTextPosition: '60%',},
        { id: 2, image: Baby2, main: 'Tasty, healthy meals for your baby.', tagline: 'Tiny Bites, Big Smiles', slug: '/food', mobilePosition: 'right', textPosition: 'left', mobileTextPosition: '0%',},
        { id: 3, image: Baby1, main: 'Adorable outfits for every tiny moment.', tagline: 'Soft, Snuggly Styles', slug: '/clothing', mobilePosition: 'center' , textPosition: 'right', mobileTextPosition: '60%'},
        { id: 4, image: Baby7, main: 'Add charm with lovely baby accessories.', tagline: 'Cute Little Extras', slug: '/accessories', mobilePosition: 'right' , textPosition: 'right', mobileTextPosition: '60%'},
        { id: 5, image: Baby3, main: 'Shoes made for little feet.', tagline: 'Tiny Steps Ahead', slug: '/footwear', mobilePosition: 'center', textPosition: 'left', mobileTextPosition: '90%'},
        { id: 6, image: Baby6, main: 'Essentials to support every mom.', tagline: 'Care for Mama Too', slug: '/mama', mobilePosition: 'center' , textPosition: 'left', mobileTextPosition: '70%',},
    ]

  return (
    <>
    <div className="py-[30px] md:py-[40px] bg-white"></div>
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[75vh] md:h-[87vh] flex items-center justify-center hover:cursor-pointer">
            <Image
              src={slide.image}
              alt={slide.tagline}
              fill
              className={`object-cover object-${slide.mobilePosition} md:object-${slide.textPosition} brightness-100`}
              priority
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className={`absolute ${slide.textPosition}-4 md:${slide.textPosition}-10 text-center text-white px-4 translate-y-[${slide.mobileTextPosition}] md:translate-y-0`}>
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