import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

function Signup({ users, setUsers }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // 1. Check if passwords match
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match! Please check your typing.');
      return;
    }

    // 2. Check if account already exists
    const exists = users.find((user) => user.email === email);
    if (exists) {
      alert('⚠️ This email already exists! Please use a different email or login.');
      return;
    }

    // 3. Strict Password Validation Rule Regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('❌ Password Error:\n• Must be at least 8 characters long\n• Must contain 1 capital letter\n• Must contain 1 small letter\n• Must contain 1 number\n• Must contain 1 special character (@$!%*?&)');
      return;
    }

    // 4. Save user to memory array simulation (including name)
    setUsers([...users, { name, email, password }]);
    alert(`🎉 Account created successfully for ${name}! Redirecting to login page...`);
    navigate('/login');
  };

  return (
    <div className="bg-white min-h-screen text-gray-950 flex flex-col pt-32 px-6 items-center">
      <Header />
      <div className="w-full max-w-md bg-yellow-50 border-4 border-gray-950 p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase text-gray-950 mb-2 text-center">Create Account</h2>
        <p className="text-xs font-bold text-orange-600 uppercase tracking-widest text-center mb-6">Join the Flavor Fiesta Club</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block font-black text-xs uppercase mb-1">Full Name</label>
            <input type="text" required onChange={(e) => setName(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" placeholder="Your Name" />
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-black text-xs uppercase mb-1">Email Address</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" placeholder="name@domain.com" />
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-black text-xs uppercase mb-1">Password</label>
            <input type="password" required onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" placeholder="••••••••" />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block font-black text-xs uppercase mb-1">Confirm Password</label>
            <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3.5 border-2 border-gray-950 rounded-xl bg-white font-bold text-sm text-gray-950 focus:outline-none" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-orange-500 hover:bg-gray-950 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest border-2 border-gray-950 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            Register Account +
          </button>
        </form>
        <p className="text-center font-bold text-sm mt-6">Already have an account? <Link to="/login" className="text-orange-600 underline">Login here</Link></p>
      </div>
    </div>
  );
}

export default Signup;