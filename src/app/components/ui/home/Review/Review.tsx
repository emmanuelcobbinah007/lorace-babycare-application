"use client";
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

import HappyMom1 from '../../../../../../public/images/pexels-william-fortunato-6393377.jpg';
import HappyMom2 from '../../../../../../public/images/smiley-mother-holding-kid-front-view.jpg';
import HappyMom3 from '../../../../../../public/images/pexels-shvetsa-11369305.jpg';

const reviews = [
    {
        image: HappyMom1,
        name: 'Amelia K.',
        text: 'The baby blanket I got was unbelievably soft and cozy—my little one sleeps so peacefully now. You can tell it’s made with love.',
    },
    {
        image: HappyMom2,
        name: 'Sofia L.',
        text: 'I’m so impressed with the quality of the baby care essentials here. From the organic lotions to the adorable outfits, everything feels premium and safe.',
    },
    {
        image: HappyMom3,
        name: 'Nana A.',
        text: 'As a first-time mom, I felt so supported. The customer service team answered all my questions, and the products arrived quickly and beautifully packaged.',
    },
];


const Review = () => {
    const [index, setIndex] = useState(0);

    const prev = () => {
        if (index > 0) setIndex(index - 1);
    };

    const next = () => {
        if (index < reviews.length - 1) setIndex(index + 1);
    };

    return (
        <div className="mx-auto w-full md:w-[80%] py-10 font-poppins overflow-hidden">
            <div className="relative flex items-center justify-between">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className={`text-2xl z-10 px-2 transition-colors ${
                        index === 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-[#4fb3e5] hover:text-[#b970a0]'
                    }`}
                >
                    <FaChevronLeft />
                </button>

                <div className="flex w-full overflow-hidden relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out w-full"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {reviews.map((review, i) => (
                            <div
                                key={i}
                                className="min-w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-4 sm:p-8"
                            >
                                <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden rounded-xl">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-10 text-center md:text-left">
                                <p className="text-sm md:text-lg text-gray-800 mb-4 italic relative before:content-['“'] after:content-['”'] before:text-2xl before:font-bold after:font-bold after:text-2xl before:mr-1 after:ml-1">
    {review.text}
</p>
                                    <p className="text-md font-semibold text-[#b970a0]">- {review.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    disabled={index === reviews.length - 1}
                    className={`text-2xl z-10 px-2 transition-colors ${
                        index === reviews.length - 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-[#4fb3e5] hover:text-[#b970a0]'
                    }`}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Review;
