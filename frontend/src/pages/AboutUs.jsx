import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutUs() {
  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-24">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16 w-full flex-1 space-y-12">
        
        {/* Banner Headers */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-black text-red-600 tracking-widest bg-red-100 px-3 py-1 rounded-md border border-gray-950">Our Heritage</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gray-950">About Flavor Fiesta</h1>
          <p className="text-gray-950 font-bold text-lg">Blending Modern Web Pipelines with Authentic Traditional Cooking Cultivation.</p>
        </div>

        {/* Thick Border Story Frame Box */}
        <div className="bg-yellow-50 border-4 border-gray-950 p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="text-2xl font-black uppercase text-gray-950"> Who We Are</h2>
          <p className="text-base text-gray-950 font-bold leading-relaxed">
            Flavor Fiesta is a high-performance food delivery platform designed exclusively for food lovers across Pakistan. Founded inside Rawalpindi, Punjab, our system bridges clean frontend interface architectures with reliable delivery logistics. We eliminate complex ordering layouts, replacing them with energetic, high-contrast menus that render clearly on any screen device.
          </p>

          <div className="border-t-2 border-gray-950 pt-6 space-y-4">
            <h3 className="text-xl font-black uppercase text-gray-950">🎯 Our Core Values</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-950 font-bold">
              <li className="bg-white p-3 rounded-xl border-2 border-gray-950">
                <span className="text-orange-600 mr-1">✓</span> Authentic Taste: Zero compromises on traditional masalas or raw meat selections.
              </li>
              <li className="bg-white p-3 rounded-xl border-2 border-gray-950">
                <span className="text-orange-600 mr-1">✓</span> Complete Clarity: Every description is high-contrast and easy to navigate.
              </li>
              <li className="bg-white p-3 rounded-xl border-2 border-gray-950">
                <span className="text-orange-600 mr-1">✓</span> Local Pricing: Straightforward packaging rates listed transparently in Rs. (PKR).
              </li>
              <li className="bg-white p-3 rounded-xl border-2 border-gray-950">
                <span className="text-orange-600 mr-1">✓</span> Express Dispatch: 20-minute pipelines to keep meals hot upon arrival.
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Headquarters Block */}
        <div className="bg-gray-50 border-2 border-gray-950 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-black text-lg text-gray-950 uppercase">📍 Main Delivery Headquarters</h4>
            <p className="text-sm text-gray-950 font-bold">Rawalpindi, Punjab, Pakistan</p>
          </div>
          <div className="text-xs bg-gray-950 text-white font-black uppercase tracking-widest px-4 py-2 rounded-lg">
            Operational Hub
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;