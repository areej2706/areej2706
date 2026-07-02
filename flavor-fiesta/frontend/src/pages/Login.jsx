import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

function Login({ users, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Look up credentials inside system
    const userFound = users.find((u) => u.email === email);
    if (!userFound) {
      alert('⚠️ Create your account first!');
      return;
    }

    if (userFound.password !== password) {
      alert('❌ Incorrect password! Please try again.');
      return;
    }

    setCurrentUser(email);
    alert('🎉 Login successful! Welcome back to Flavor Fiesta.');
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-32 px-6 items-center">
      <Header />
      <div className="w-full max-w-md bg-orange-50 border-4 border-gray-950 p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase text-gray-950 mb-2 text-center">User Portal Login</h2>
        <p className="text-xs font-bold text-red-600 uppercase tracking-widest text-center mb-6">Access your active dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-black text-xs uppercase mb-1">Email Address</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" />
          </div>
          <div>
            <label className="block font-black text-xs uppercase mb-1">Password</label>
            <input type="password" required onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-gray-950 hover:bg-orange-600 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest border-2 border-gray-950 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            Authenticate Login Securely
          </button>
        </form>
        <p className="text-center font-bold text-sm mt-6">New foodie? <Link to="/signup" className="text-red-600 underline">Create your account here</Link></p>
      </div>
    </div>
  );
}

export default Login;