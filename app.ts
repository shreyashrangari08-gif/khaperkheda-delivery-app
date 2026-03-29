import React from 'react';
import ReactDOM from 'react-dom/client';

// Ye aapki app ka simple design hai
const App = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f0f2f5',
      height: '100vh'
    }}>
      <h1 style={{ color: '#1a73e8' }}>Khaperkheda Delivery App</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        display: 'inline-block',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <p style={{ fontSize: '18px' }}>🚀 App Live ho chuki hai!</p>
        <p>Ab hum is link se APK bana sakte hain.</p>
      </div>
    </div>
  );
};

// Ye code aapki app ko "root" div mein daal dega
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
