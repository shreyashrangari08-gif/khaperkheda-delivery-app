import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, MapPin, Plus, Minus, CheckCircle, Smartphone } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // Replit se li gayi asli dishes aur rates
  const menuItems = [
    { id: 1, name: "Special Chicken Biryani", price: 160, img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a6f8?w=400" },
    { id: 2, name: "Veg Paneer Masala", price: 140, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
    { id: 3, name: "Butter Tandoori Roti", price: 15, img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400" },
    { id: 4, name: "Dal Tadka (Double)", price: 110, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
    { id: 5, name: "Chicken Tikka (6 Pcs)", price: 180, img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400" },
    { id: 6, name: "Cold Drink (600ml)", price: 45, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" }
  ];

  const addToCart = (item: any) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    const existing = cart.find(i => i.id === id);
    if (existing?.qty === 1) {
      setCart(cart.filter(i => i.id !== id));
    } else {
      setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i));
    }
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const sendOrder = () => {
    if (!address) return alert("Kripya Khaperkheda ka address daalein!");
    const list = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
    const msg = `*Naya Order - Khaperkheda Delivery*\n\n*Items:* ${list}\n*Total:* ₹${total}\n*Customer Phone:* ${phone}\n*Address:* ${address}`;
    window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (view === 'login') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginTop: '50px', fontSize: '2.5rem' }}>Khaperkheda Delivery</h1>
      <p style={{ opacity: 0.9 }}>Asli Swaad, Aapke Ghar Tak</p>
      <form onSubmit={(e)=>{e.preventDefault(); setView('otp')}} style={{ marginTop: '50px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>+91</span>
          <input type="tel" placeholder="Mobile Number" onChange={(e)=>setPhone(e.target.value)} required style={{ border: 'none', width: '100%', outline: 'none', fontSize: '18px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', backgroundColor: 'white', color: '#ff4757', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>Get OTP</button>
      </form>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#ff4757' }}>Verify Number</h2>
      <p>Test Code '120722' ka use karein</p>
      <input type="text" placeholder="OTP Code" onChange={(e)=>setOtp(e.target.value)} style={{ width: '100%', padding: '15px', textAlign: 'center', fontSize: '24px', margin: '30px 0', borderRadius: '12px', border: '2px solid #ddd' }} />
      <button onClick={() => otp === '120722' ? setView('home') : alert('Galat code!')} style={{ width: '100%', padding: '15px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>Login</button>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '120px' }}>
      <header style={{ backgroundColor: '#ff4757', color: 'white', padding: '20px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0 }}>Khaperkheda Menu 🚚</h2>
      </header>

      <div style={{ padding: '15px' }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px', display: 'flex', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <img src={item.img} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#ff4757', fontWeight: 'bold' }}>₹{item.price}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => addToCart(item)} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 15px', fontWeight: 'bold' }}>ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '15px', boxShadow: '0 -5px 20px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="Enter Full Address in Khaperkheda" onChange={(e)=>setAddress(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <button onClick={sendOrder} style={{ width: '100%', backgroundColor: '#2ed573', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart size={20} /> Checkout (₹{total})
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
