"use client";

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

// importing images
import Baby1 from "../../../../../../public/images/babyLaugh.jpg"
import Baby2 from "../../../../../../public/images/babySleep.jpg"
import Baby3 from "../../../../../../public/images/yellowBaby.jpg"
import Baby4 from "../../../../../../public/images/pexels-vanessa-loring-5082630.jpg"
import Baby5 from "../../../../../../public/images/pexels-simple-soul-photogrphy-1100392298-27010370.jpg"
import Baby6 from "../../../../../../public/images/pexels-shvetsa-11369366.jpg"
import Baby7 from "../../../../../../public/images/pexels-ryutaro-5220097.jpg"

const HeroSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const autoplay = useCallback(() => {
        if (!emblaApi) return
    
        const interval = setInterval(() => {
          if (!emblaApi) return
          emblaApi.scrollNext()
        }, 5000) // ← This is the slide duration in ms (5000ms = 5 seconds)
    
        return () => clearInterval(interval)
      }, [emblaApi])


      useEffect(() => {
        const stop = autoplay()
        return stop
      }, [autoplay])


    const slides = [
        { id: 1, image: Baby1, main: 'All baby must-haves in one spot.', tagline: 'Everything Your Baby Needs', slug: '/store' },
        { id: 2, image: Baby2, main: 'Tasty, healthy meals for your baby.', tagline: 'Tiny Bites, Big Smiles', slug: '/food' },
        { id: 3, image: Baby3, main: 'Adorable outfits for every tiny moment.', tagline: 'Soft, Snuggly Styles', slug: '/clothing' },
        { id: 4, image: Baby4, main: 'Add charm with lovely baby accessories.', tagline: 'Cute Little Extras', slug: '/accessories' },
        { id: 5, image: Baby5, main: 'Shoes made for little feet.', tagline: 'Tiny Steps Ahead', slug: '/footwear' },
        { id: 6, image: Baby6, main: 'Essentials to support every mom.', tagline: 'Care for Mama Too', slug: '/mama' },
    ]

  return (
    <>
    <div className="py-[30px] md:py-[40px] bg-white"></div>
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[85vh] md:h-[87vh] flex items-center justify-center hover:cursor-pointer">
            <Image
              src={slide.image}
              alt={slide.tagline}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-white/40 z-10 flex items-center justify-center">
              <h2 className="text-black text-xl md:text-4xl font-bold text-center px-4">{slide.tagline}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>

  )
}

export default HeroSection