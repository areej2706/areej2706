import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-12 px-6 mt-auto border-t-4 border-gray-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-400 text-2xl font-black">
            🌶️ Flavor Fiesta
          </h3>
          <p className="text-sm leading-relaxed text-gray-300 font-bold">
            Bringing the spiciest, most delicious food right to your doorstep. Experience premium dining and effortless ordering today.
          </p>
        </div>

        {/* Contacts */}
        <div className="flex flex-col items-center md:items-start justify-center space-y-4">
          <h4 className="text-white font-black text-lg uppercase tracking-wider">Find & follow us</h4>
          
          {/* Social Icons circles */}
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center hover:scale-110 transition-transform border border-white">f</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-sky-400 text-white font-black flex items-center justify-center hover:scale-110 transition-transform border border-white">t</a>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center hover:scale-110 transition-transform border border-white">g</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-600 text-white font-black flex items-center justify-center hover:scale-110 transition-transform border border-white">i</a>
          </div>

          <ul className="text-sm space-y-1 font-bold text-gray-200">
            <li>📞 Tel: +92 300 1234567</li>
            <li>✉️ Email: support@flavorfiesta.com</li>
          </ul>
        </div>

        {/* Location Summary */}
        <div className="flex flex-col justify-center items-center md:items-end">
          <div className="text-center md:text-right space-y-1">
            <h4 className="text-white font-black uppercase text-sm tracking-wider">Main Headquarters</h4>
            <p className="text-sm text-orange-400 font-black">
              📍 Rawalpindi, Punjab, Pakistan
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 border-t border-gray-800 mt-8 pt-4 font-bold tracking-wide">
        Copyright © 2026 Flavor Fiesta. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;