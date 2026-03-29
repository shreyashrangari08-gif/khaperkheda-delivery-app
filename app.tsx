import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ShoppingCart, MapPin, Send, CheckCircle, Package, User, Lock, Phone } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState(null); // Logged in user info
  const [view, setView] = useState('welcome'); // welcome, login, signup, otp, home
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Idle');

  // --- Login/Signup Logic ---
  const handleLogin = (e) => {
    e.preventDefault();
    setView('home'); // Simple login for now
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setView('otp'); // Go to OTP screen after signup
  };

  const verifyOtp = () => {
    alert("OTP Verified Successfully!");
    setUser({ name: "User" });
    setView('home');
  };

  // --- Menu Data ---
  const menuItems = [
    { id: 1, name: 'Special Thali', price: 120, img: '🍛' },
    { id: 2, name: 'Paneer Butter Masala', price: 180, img: '🍲' },
    { id: 3, name: 'Butter Naan', price: 30, img: '🫓' }
  ];

  // --- App Views ---
  if (view === 'welcome') {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white' }}>
        <h1 style={{ marginTop: '100px' }}>Khaperkheda Delivery</h1>
        <p>Fresh Food, Fast Delivery</p>
        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button onClick={() => setView('login')} style={{ padding: '15px', borderRadius: '30px', border: 'none', fontWeight: 'bold', color: '#ff4757' }}>Login</button>
          <button onClick={() => setView('signup')} style={{ padding: '15px', borderRadius: '30px', border: '2px solid white', backgroundColor: 'transparent', color: 'white', fontWeight: 'bold' }}>Create New Account</button>
        </div>
      </div>
    );
  }

  if (view === 'signup') {
    return (
      <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#ff4757' }}>Create Account</h2>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input type="text" placeholder="Full Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <input type="tel" placeholder="Mobile Number" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <input type="email" placeholder="Email Address" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <button type="submit" style={{ padding: '15px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Send OTP</button>
          <p onClick={() => setView('welcome')} style={{ textAlign: 'center', color: '#666' }}>Back</p>
        </form>
      </div>
    );
  }

  if (view === 'otp') {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <Lock size={50} color="#ff4757" />
        <h2>Verify OTP</h2>
        <p>Enter the 4-digit code sent to your phone</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
          {[1,2,3,4].map(i => <input key={i} type="text" maxLength="1" style={{ width: '40px', height: '50px', fontSize: '24px', textAlign: 'center', borderRadius: '8px', border: '1px solid #ddd' }} />)}
        </div>
        <button onClick={verifyOtp} style={{ width: '100%', padding: '15px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Confirm & Login</button>
      </div>
    );
  }

  // --- Home View (Old Logic) ---
  if (view === 'home') {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    return (
      <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '80px' }}>
        <header style={{ backgroundColor: '#ff4757', color: 'white', padding: '15px', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>Khaperkheda Delivery</h2>
          <small>Welcome back, User!</small>
        </header>
        {/* Menu and Cart logic starts here... (Wahi purana code jo niche tha) */}
        <div style={{ padding: '20px' }}>
           {menuItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', margin: '10px 0', padding: '15px', borderRadius: '12px' }}>
               <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#2ed573' }}>₹{item.price}</p>
              </div>
              <button onClick={() => setCart([...cart, item])} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '8px' }}>Add +</button>
            </div>
           ))}
        </div>
        {cart.length > 0 && (
          <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <h3>Total: ₹{totalPrice}</h3>
            <button style={{ backgroundColor: '#2ed573', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px' }}>Order via WhatsApp</button>
          </div>
        )}
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div style={{ padding: '30px' }}>
        <h2 style={{ color: '#ff4757' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="tel" placeholder="Mobile Number" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <button type="submit" style={{ padding: '15px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Login</button>
          <p onClick={() => setView('signup')} style={{ textAlign: 'center', color: '#666' }}>New here? Create Account</p>
        </form>
      </div>
    );
  }
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}
