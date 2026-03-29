import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ReCAPTCHA ko button click se pehle taiyaar karne ke liye
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response: any) => {
          console.log("reCAPTCHA verified");
        }
      });
    }
  };

  const onSignInSubmit = async (e: any) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return alert("Sahi mobile number daaliye!");
    
    setLoading(true);
    setupRecaptcha();

    const appVerifier = (window as any).recaptchaVerifier;
    const formatPhone = phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber;

    try {
      const result = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
      setConfirmationResult(result);
      setView('otp');
      alert("OTP Bhej Diya Gaya Hai!");
    } catch (error: any) {
      console.error("Auth Error:", error);
      alert("Error: " + error.message);
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      await confirmationResult.confirm(otp);
      setView('home');
    } catch (error) {
      alert("Galat OTP! Phir se koshish karein.");
    }
  };

  if (view === 'welcome') return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem' }}>Khaperkheda Delivery</h1>
      <p>Aapka Swagat Hai!</p>
      <button onClick={() => setView('login')} style={{ marginTop: '50px', padding: '15px 40px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>Login to Order</button>
    </div>
  );

  if (view === 'login') return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#ff4757' }}>Mobile Number Verification</h2>
      <p style={{ color: '#666' }}>Hum aapko ek asli SMS bhejenge.</p>
      <form onSubmit={onSignInSubmit} style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #ddd', borderRadius: '10px', padding: '5px 15px', marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '10px' }}>+91</span>
          <input type="tel" placeholder="9876543210" onChange={(e) => setPhoneNumber(e.target.value)} required style={{ flex: 1, padding: '12px', border: 'none', fontSize: '18px', outline: 'none' }} />
        </div>
        <button id="sign-in-button" type="submit" disabled={loading} style={{ width: '100%', padding: '15px', backgroundColor: loading ? '#ccc' : '#ff4757', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
          {loading ? 'Bhej rahe hain...' : 'Send OTP via SMS'}
        </button>
      </form>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#ff4757' }}>Enter 6-Digit OTP</h2>
      <p>Jo aapke mobile par SMS aaya hai wo yahan likhein.</p>
      <input type="text" placeholder="XXXXXX" onChange={(e) => setOtp(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', textAlign: 'center', borderRadius: '10px', border: '2px solid #ddd', fontSize: '24px', letterSpacing: '5px', marginTop: '20px' }} />
      <button onClick={verifyCode} style={{ width: '100%', padding: '15px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>Verify & Start Ordering</button>
    </div>
  );

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '60px', color: '#2ed573' }}>✓</div>
      <h1 style={{ color: '#2ed573' }}>Verified Successfully!</h1>
      <p style={{ fontSize: '18px' }}>Phone: <strong>{phoneNumber}</strong></p>
      <hr style={{ margin: '30px 0', border: '0.5px solid #eee' }} />
      <p>Ab aap Khaperkheda ke menu se order kar sakte hain.</p>
      <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px', borderRadius: '5px', border: '1px solid #ddd' }}>Logout</button>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
