import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ShoppingCart, MapPin, Send, CheckCircle, Package } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Idle'); // Idle, Confirmed, OutForDelivery, Delivered

  const menuItems = [
    { id: 1, name: 'Special Thali', price: 120, img: '🍛' },
    { id: 2, name: 'Paneer Butter Masala', price: 180, img: '🍲' },
    { id: 3, name: 'Butter Naan', price: 30, img: '🫓' }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const confirmOrder = () => {
    setOrderStatus('Confirmed');
    
    // WhatsApp Details formation
    const itemList = cart.map(i => `${i.name} (₹${i.price})`).join(', ');
    const message = `*Naya Order!*%0AItems: ${itemList}%0ATotal: ₹${totalPrice}%0ALocation: Khaperkheda%0AStatus: Confirmed`;
    
    // Replace 91XXXXXXXXXX with your actual number
    const whatsappUrl = `https://wa.me/919699343711?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Logic for Google Maps Tracking (Static for now, can be dynamic)
    setTimeout(() => {
       alert("Order Confirmed! Aapka khana jaldi pahuchega.");
    }, 1000);
  };

  const openTracking = () => {
    // Khaperkheda standard coordinates or user location
    window.open('https://www.google.com/maps/dir/?api=1&destination=Khaperkheda', '_blank');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ff4757', color: 'white', padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0 }}>Khaperkheda Delivery Manager</h1>
        <p style={{ margin: '5px 0 0' }}>Sahi Maal, Sahi Time Par!</p>
      </header>

      {/* Order Status Tracker */}
      <div style={{ margin: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center' }}>
        <h3><Package size={20} /> Order Status: <span style={{ color: '#ff4757' }}>{orderStatus}</span></h3>
        {orderStatus === 'Confirmed' && (
          <button onClick={openTracking} style={{ marginTop: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={16} /> Track on Maps
          </button>
        )}
      </div>

      {/* Menu Section */}
      <main style={{ padding: '0 20px' }}>
        <h2 style={{ borderBottom: '2px solid #ff4757', paddingBottom: '5px' }}>Menu Items</h2>
        {menuItems.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', margin: '10px 0', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ fontSize: '30px' }}>{item.img}</span>
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#2ed573', fontWeight: 'bold' }}>₹{item.price}</p>
              </div>
            </div>
            <button onClick={() => addToCart(item)} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>Add +</button>
          </div>
        ))}
      </main>

      {/* Floating Action Bar */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '15px', boxShadow: '0 -4px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Total Amount</p>
            <h3 style={{ margin: 0 }}>₹{totalPrice}</h3>
          </div>
          <button onClick={confirmOrder} style={{ backgroundColor: '#2ed573', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Confirm Order <CheckCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}
