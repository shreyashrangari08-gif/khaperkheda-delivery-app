import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Lock, Phone, ChevronRight } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('login'); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return alert("Sahi number daalein!");
    // OTP Screen par bhejein
    setView('otp');
  };

  const handleVerify = () => {
    // Humne Firebase mein jo code rakha tha: 120722
    if (otp === '120722') {
      setView('home');
    } else {
      alert("Galat OTP! Test code '120722' ka use karein.");
    }
  };

  if (view === 'login') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginTop: '50px' }}>Khaperkheda Delivery</h1>
      <p>Apna Mobile Number Verification Karein</p>
      <form onSubmit={handleLogin} style={{ marginTop: '40px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>+91</span>
          <input type="tel" placeholder="9699343711" onChange={(e)=>setPhone(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none', fontSize: '18px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: 'white', color: '#ff4757', fontWeight: 'bold', fontSize: '18px' }}>Send OTP</button>
      </form>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#ff4757' }}>Verify OTP</h2>
      <p>Test code '120722' enter karein</p>
      <input type="text" placeholder="XXXXXX" onChange={(e)=>setOtp(e.target.value)} style={{ width: '100%', padding: '15px', textAlign: 'center', fontSize: '24px', letterSpacing: '5px', margin: '30px 0', borderRadius: '10px', border: '2px solid #ddd' }} />
      <button onClick={handleVerify} style={{ width: '100%', padding: '15px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Verify & Login</button>
    </div>
  );

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ed573' }}>✓ Logged In!</h1>
      <p>Swagat Hai, Shreyash!</p>
      <button onClick={() => setView('login')} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
