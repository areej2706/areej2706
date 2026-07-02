import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { masterMenu } from '../data/menuData';

function OurMenu({ addToCart, toggleFavorite, favorites, updateQuantity, cart }) {
  const [activeTab, setActiveTab] = useState('Food');
  const categories = ['Food', 'Burgers', 'Pizza', 'Sushi', 'Drink'];
  const filteredItems = masterMenu.filter(item => item.category === activeTab);

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-24">
      <Header cartCount={cart.length} />

      <div className="bg-gray-950 text-white py-12 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Gourmet Master Menu Catalog</h1>
        <p className="text-orange-400 font-bold text-base mt-1">All traditional items curated natively in Pakistani Rupees (PKR)</p>
      </div>

      {/* Tabs Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-10 flex flex-wrap justify-center gap-2">
        {categories.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-gray-950 cursor-pointer transition-all ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-white text-gray-950'}`}>
            {tab === 'Food' ? 'Desi Delights' : tab}
          </button>
        ))}
      </div>

      {/* Huge List Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const cartItem = cart.find((i) => i.id === item.id);
          const isFavorite = favorites.includes(item.id);

          return (
            <div key={item.id} className="bg-white border-2 border-gray-950 rounded-2xl p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative group">
              
              {/* Interactive Floating Favorite Star Block Anchor */}
              <button onClick={() => toggleFavorite(item.id)} className="absolute top-4 right-4 text-2xl focus:outline-none z-10 cursor-pointer">
                {isFavorite ? '❤️' : '🤍'}
              </button>

              <div className="text-6xl text-center my-4">{item.img}</div>
              
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="text-gray-950 font-black text-lg leading-tight">{item.name}</h3>
                    <span className="text-base font-black text-gray-950 bg-amber-100 px-2 py-0.5 rounded-md">Rs. {item.price}</span>
                  </div>
                  <p className="text-sm text-gray-950 font-bold leading-snug">{item.description}</p>
                </div>

                {/* Counter Controllers and Action Button Elements */}
                <div className="pt-4 mt-4 border-t-2 border-gray-100 space-y-3">
                  {cartItem ? (
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-xl border-2 border-gray-950">
                      <button onClick={() => updateQuantity(item.id, -1)} className="bg-white w-8 h-8 rounded-lg font-black border border-gray-950">-</button>
                      <span className="font-black text-sm text-gray-950">{cartItem.quantity} In Basket</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="bg-white w-8 h-8 rounded-lg font-black border border-gray-950">+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="w-full bg-orange-500 hover:bg-gray-950 text-white font-black py-3 rounded-xl uppercase text-xs tracking-widest border-2 border-gray-950 transition-all cursor-pointer">
                      Add To Cart Basket +
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default OurMenu;