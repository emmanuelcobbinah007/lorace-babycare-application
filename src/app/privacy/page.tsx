"use client";

import React from 'react';
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${patrickHand.className} text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5]`}>
          Privacy Policy
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Order history and preferences</li>
              <li>Account credentials</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your questions and requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Payment processors and shipping partners</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#b970a0] mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@loracebabycare.com" className="text-[#4fb3e5] hover:text-[#b970a0] transition-colors duration-300">
                privacy@loracebabycare.com
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

export default PrivacyPolicyPage;
