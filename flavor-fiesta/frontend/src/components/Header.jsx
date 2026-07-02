import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Header({ cartCount }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b-2 border-gray-950 z-50 px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2 text-gray-950">
          <span className="bg-linear-to-r from-red-600 to-orange-500 w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg border-2 border-gray-950">🌶️</span>
          <span className="font-extrabold">Flavor<span className="text-orange-600">Fiesta</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-950 font-black text-sm tracking-wider uppercase">
          <Link to="/" className="hover:text-orange-600 transition-all py-1">Home</Link>
          <Link to="/menu" className="hover:text-orange-600 transition-all py-1">Our Menu</Link>
          <Link to="/services" className="hover:text-orange-600 transition-all py-1">Services</Link>
          <Link to="/about" className="hover:text-orange-600 transition-all py-1">About Us</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-gray-950 hover:text-orange-600 font-black text-sm flex items-center gap-1.5 bg-gray-100 px-3 py-2 rounded-xl border-2 border-gray-950">
            Cart 🛒 <span className="bg-orange-600 text-white font-black rounded-full px-2 py-0.5 text-xs">{cartCount || 0}</span>
          </Link>
          <button onClick={() => navigate('/login')} className="text-gray-950 hover:text-red-600 font-black text-sm transition-colors cursor-pointer">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="bg-gray-950 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl border-2 border-gray-950 transition-all active:scale-95 cursor-pointer">
            Register
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Header;