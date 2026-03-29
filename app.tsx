import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ShoppingCart, Send } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState(0);
  const items = [
    { id: 1, name: 'Special Thali', price: '₹120', img: '🍛' },
    { id: 2, name: 'Paneer Butter Masala', price: '₹180', img: '🍲' },
    { id: 3, name: 'Butter Naan', price: '₹30', img: '🫓' }
  ];

  const sendOrder = () => {
    const msg = "Hello! Mujhe Khaperkheda Delivery se order dena hai.";
    window.open(`https://wa.me/91YOURNUMBER?text=${msg}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1a73e8', color: 'white', padding: '15px', textAlign: 'center', position: 'sticky', top: 0 }}>
        <h1>Khaperkheda Delivery</h1>
        <p>Ghar jaisa swad, ab aapke dwar!</p>
      </header>

      <main style={{ padding: '20px' }}>
        <h2>Today's Menu</h2>
        {items.map(item => (
          <div key={item.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div>
              <span style={{ fontSize: '30px' }}>{item.img}</span>
              <h3 style={{ margin: '5px 0' }}>{item.name}</h3>
              <p style={{ color: '#28a745', fontWeight: 'bold' }}>{item.price}</p>
            </div>
            <button onClick={() => setCart(cart + 1)} style={{ backgroundColor: '#1a73e8', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px' }}>Add +</button>
          </div>
        ))}
      </main>

      <footer style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <button onClick={sendOrder} style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '50px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Send size={20} /> Order on WhatsApp ({cart})
        </button>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}
