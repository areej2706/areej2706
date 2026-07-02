import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home({ cartCount, hasPlacedOrder, setHasPlacedOrder, setCart }) {
  
  const triggerInstantOrder = () => {
    setCart([{ id: 'instant-1', name: 'Instant Chef Special Thali Platter', price: 1250, img: '🥘', quantity: 1 }]);
    setHasPlacedOrder(true);
    alert("🚀 Instant Order Placed Successfully! Your 'Track Order' option is now unlocked on the homepage.");
  };

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-24">
      <Header cartCount={cartCount} />

      {/* Hero Accent Banner */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6">
          <span className="bg-red-100 text-red-700 font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-xl inline-block border-2 border-red-200">
            Pakistan's Premium Gourmet Delivery Hub
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tight leading-none">
            Delicious Food <br /> Delivered <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-500">Fast & Hot</span>
          </h1>
          
          {/* Main Action Triggers */}
          <div className="pt-2 flex flex-wrap gap-4">
            <button onClick={triggerInstantOrder} className="bg-orange-500 hover:bg-gray-950 text-white font-black uppercase text-xs tracking-widest px-8 py-4.5 rounded-xl transition-all border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              Order Now ⚡
            </button>
            <Link to="/menu" className="bg-white hover:bg-gray-100 text-gray-950 font-black uppercase text-xs tracking-widest px-8 py-4.5 rounded-xl transition-all border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              Browse Menu List 📜
            </Link>
          </div>
        </div>

        {/* Dynamic Interactive Tracking Banner Widget */}
        <div className="space-y-4">
          {hasPlacedOrder ? (
            <div className="bg-green-50 border-4 border-green-600 p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(22,163,74,1)] animate-pulse">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚴</span>
                <h3 className="font-black text-xl text-green-900 uppercase">Track Live Dispatch</h3>
              </div>
              <p className="text-sm font-bold text-green-900">Status: Your order is freshly packed and handled by our courier in Rawalpindi! Estimated arrival: 18 minutes.</p>
              <button onClick={() => { setHasPlacedOrder(false); alert("Order archived."); }} className="mt-4 text-xs font-black uppercase tracking-wider bg-green-600 text-white px-3 py-1.5 rounded-lg">Dismiss Route</button>
            </div>
          ) : (
            <div className="bg-linear-to-br from-orange-100 to-yellow-100 rounded-3xl p-12 flex flex-col items-center justify-center min-h-75 border-4 border-gray-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <div className="text-8xl mb-2">🍛</div>
              <p className="text-gray-950 font-black text-lg">Your tracking route updates live here when an active order is placed.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;