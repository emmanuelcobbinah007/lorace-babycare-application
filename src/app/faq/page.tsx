"use client";

import React from 'react';
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const FaqPage = () => {
  const faqs = [
    {
      question: "What are your shipping rates?",
      answer: "We offer standard shipping within Ghana. Shipping rates vary based on location and order weight. During checkout, you'll see the exact shipping cost before finalizing your order."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery. Items must be unused, in original packaging, and in resalable condition. Please contact our customer service team to initiate a return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package's journey to you."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer gift wrapping services for a small additional fee. Simply select the gift wrap option during checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, Mobile Money, and bank transfers. All payments are processed securely."
    },
    {
      question: "How do I know if a product is in stock?",
      answer: "If a product is available, you'll see the 'Add to Cart' button on the product page. If it's out of stock, it will be marked as 'Out of Stock'."
    },
    {
      question: "What is your price match policy?",
      answer: "We strive to offer competitive prices. If you find a lower price on an identical item from a qualified retailer, contact us and we'll review your request."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service team through email at support@loracebabycare.com or through our contact form on the Contact Us page."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${patrickHand.className} text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5]`}>
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-[#b970a0] mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Didn't find what you're looking for?{' '}
            <a href="/contact" className="text-[#4fb3e5] hover:text-[#b970a0] transition-colors duration-300">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
