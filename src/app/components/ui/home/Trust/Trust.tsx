import React from 'react'
import Image from 'next/image'

import Check from '../../../../../../public/TrustBadges/check.png'
import Free from '../../../../../../public/TrustBadges/free.png'
import Handshake from '../../../../../../public/TrustBadges/handshake.png'
import Shield from '../../../../../../public/TrustBadges/shield.png'

const Trust = () => {
    return (
        <div className="mx-auto w-[90%] max-w-[1200px] flex flex-col items-center justify-center py-10">
            <div className="relative w-full">
                {/* Scrollable badges */}
                <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 scrollbar-hide px-4">
                    {[
                        {
                            image: Check,
                            alt: 'Check Badge',
                            title: 'Quality Assurance',
                            description: 'We ensure the highest quality in all our products.',
                        },
                        {
                            image: Free,
                            alt: 'Free Badge',
                            title: 'Free Shipping',
                            description: 'Enjoy free shipping on all orders.',
                        },
                        {
                            image: Handshake,
                            alt: 'Handshake Badge',
                            title: 'Trusted Service',
                            description: 'We are committed to providing reliable service.',
                        },
                        {
                            image: Shield,
                            alt: 'Shield Badge',
                            title: 'Safety Certified',
                            description: 'Our products meet the highest safety standards.',
                        },
                    ].map((badge, i) => (
                        <div
                            key={i}
                            className="min-w-[calc(50%-0.5rem)] flex-shrink-0 md:min-w-0 flex flex-col items-center text-center"
                        >
                            <Image src={badge.image} alt={badge.alt} width={80} height={80} />
                            <h3 className="mt-4 text-lg font-semibold">{badge.title}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                    ))}
                </div>

                {/* Gradient scroll hints for mobile */}
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
            </div>
        </div>
    )
}

export default Trust
