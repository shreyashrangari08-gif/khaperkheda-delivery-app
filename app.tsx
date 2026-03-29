import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#ff4757',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🚚</h1>
      <h1 style={{ margin: 0 }}>Khaperkheda Delivery</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '20px', opacity: 0.9 }}>
        App Testing Mode Mein Hai...
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        borderRadius: '15px' 
      }}>
        <p>Shreyash, agar aapko ye screen dikh rahi hai,</p>
        <p><strong>Toh iska matlab App LIVE ho gayi hai!</strong></p>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          marginTop: '30px', 
          padding: '12px 25px', 
          borderRadius: '25px', 
          border: 'none', 
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
        Refresh App
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
