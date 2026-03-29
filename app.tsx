import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Lock, Phone, ShoppingCart, CheckCircle } from 'lucide-react';

// --- AAPKA FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyBLLl4VbezE7AJsMypwvGrATa0bBwucyjA",
  authDomain: "khaperkheda-delivery.firebaseapp.com",
  projectId: "khaperkheda-delivery",
  storageBucket: "khaperkheda-delivery.firebasestorage.app",
  messagingSenderId: "481847511269",
  appId: "1:481847511269:web:50931e36fcd3013fae2c0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [view, setView] = useState('welcome'); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' });
    }
    const formatPhone = phoneNumber.startsWith('+') ? phoneNumber : '+91' + phoneNumber;
    try {
      const result = await signInWithPhoneNumber(auth, formatPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setView('otp');
      alert("Asli OTP bhej diya gaya hai!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      setView('home'); // Ab sirf sahi OTP par hi andar jaayega!
    } catch (error) {
      alert("Galat OTP! Kripya sahi code daalein.");
    }
  };

  if (view === 'welcome') return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white' }}>
      <h1>Khaperkheda Delivery</h1>
      <div id="recaptcha-container"></div>
      <button onClick={() => setView('login')} style={{ marginTop: '50px', padding: '15px 30px', borderRadius: '30px', border: 'none', fontWeight: 'bold' }}>Login with OTP</button>
    </div>
  );

  if (view === 'login') return (
    <div style={{ padding: '30px' }}>
      <h2>Enter Mobile Number</h2>
      <form onSubmit={sendOtp}>
        <input type="tel" placeholder="9876543210" onChange={(e)=>setPhoneNumber(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '20px' }} />
        <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px' }}>Send OTP</button>
      </form>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Verify OTP</h2>
      <input type="text" placeholder="6-digit code" onChange={(e)=>setOtp(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', textAlign: 'center' }} />
      <button onClick={verifyOtp} style={{ width: '100%', padding: '15px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '8px' }}>Verify & Login</button>
    </div>
  );

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <CheckCircle size={60} color="#2ed573" />
      <h1>Welcome to the App!</h1>
      <p>Verified Mobile: {phoneNumber}</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) { ReactDOM.createRoot(rootElement).render(<App />); }
