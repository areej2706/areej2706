import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CartPage({ cart, updateQuantity, setHasPlacedOrder, setCart }) {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) {
      alert("🛒 Your food basket is empty! Add items from our menu first.");
      return;
    }
    setHasPlacedOrder(true);
    setCart([]); // Reset basket state
    alert("🎉 Order placed successfully across Rawalpindi routes! Check the Home tracking map panel.");
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-24">
      <Header cartCount={cart.length} />

      <div className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 space-y-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-gray-950">Your Cart Basket</h1>

        {cart.length === 0 ? (
          <div className="bg-gray-50 border-2 border-gray-950 p-12 text-center rounded-2xl space-y-4">
            <p className="text-xl font-bold text-gray-950">Your food basket is completely empty!</p>
            <Link to="/menu" className="inline-block bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl border-2 border-gray-950">Browse Menu Items</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-2 border-gray-950 rounded-2xl overflow-hidden divide-y-2 divide-gray-950">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{item.img}</span>
                    <div>
                      <h3 className="font-black text-base text-gray-950">{item.name}</h3>
                      <p className="text-sm font-bold text-orange-600">Rs. {item.price} each</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-950 p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 font-black text-base">-</button>
                      <span className="px-3 font-black text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 font-black text-base">+</button>
                    </div>
                    <span className="font-black text-base min-w-20 text-right">Rs. {item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations Frame summary */}
            <div className="bg-yellow-50 border-4 border-gray-950 p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs font-black uppercase text-gray-950">Grand Order Total:</p>
                <p className="text-3xl font-black text-gray-950">Rs. {totalPrice}</p>
              </div>
              <button onClick={handleCheckoutSubmit} className="bg-orange-500 hover:bg-gray-950 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl border-2 border-gray-950 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                Confirm & Place Order Delivery 🚴
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;