import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurMenu from './pages/OurMenu';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CartPage from './pages/CartPage';

function App() {
  // In-memory Database Simulations
  const [users, setUsers] = useState([]); // Stores { email, password }
  const [currentUser, setCurrentUser] = useState(null); // Stores logged-in user email
  const [cart, setCart] = useState([]); // Stores { id, name, price, img, quantity }
  const [favorites, setFavorites] = useState([]); // Stores favorite item IDs
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false); // Controls "Track Order" visibility

  // Universal Cart Actions
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    alert(`🎉 ${item.name} added to cart successfully!`);
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Home cartCount={cart.length} hasPlacedOrder={hasPlacedOrder} setHasPlacedOrder={setHasPlacedOrder} setCart={setCart} />} />
      <Route path="/menu" element={<OurMenu addToCart={addToCart} toggleFavorite={toggleFavorite} favorites={favorites} updateQuantity={updateQuantity} cart={cart} />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login users={users} setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<Signup users={users} setUsers={setUsers} />} />
      <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} setHasPlacedOrder={setHasPlacedOrder} setCart={setCart} />} />
    </Routes>
  );
}

export default App;