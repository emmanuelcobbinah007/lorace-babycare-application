"use client";

import React from 'react';
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${patrickHand.className} text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5]`}>
          Terms of Service
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing or using Lorace Babycare's website and services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you do not have permission to access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Account Registration</h2>
            <p className="text-gray-600 mb-4">
              When you create an account with us, you guarantee that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You are over 18 years of age</li>
              <li>The information you provide is accurate and complete</li>
              <li>You will maintain the accuracy of such information</li>
              <li>Your use of our services does not violate any applicable law or regulation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Products and Services</h2>
            <p className="text-gray-600 mb-4">
              All products and services are subject to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Availability</li>
              <li>The prices and terms displayed on our website</li>
              <li>Our shipping policies</li>
              <li>Our return and refund policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Prohibited Activities</h2>
            <p className="text-gray-600 mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use our services for any illegal purposes</li>
              <li>Infringe on our intellectual property rights</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Interfere with the proper functioning of our website</li>
              <li>Harass, abuse, or harm another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Payment and Billing</h2>
            <p className="text-gray-600 mb-4">
              By making a purchase, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide valid payment information</li>
              <li>Pay all charges at the prices in effect when incurred</li>
              <li>Pay any applicable taxes</li>
              <li>Accept our refund and return policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              Lorace Babycare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. 
              Our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will notify users of any material changes through our website or via email. 
              Your continued use of our services following such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@loracebabycare.com" className="text-[#4fb3e5] hover:text-[#b970a0] transition-colors duration-300">
                legal@loracebabycare.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
