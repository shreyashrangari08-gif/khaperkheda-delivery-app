import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, MapPin, Plus, Minus, CheckCircle, Smartphone, Search } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // Replit project se li gayi vahi dishes aur prices
  const menuItems = [
    { id: 1, name: "Special Chicken Biryani", price: 160, category: "Non-Veg", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a6f8?w=400" },
    { id: 2, name: "Veg Paneer Masala", price: 140, category: "Veg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
    { id: 3, name: "Butter Tandoori Roti", price: 15, category: "Breads", img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400" },
    { id: 4, name: "Dal Tadka Fry", price: 110, category: "Veg", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
    { id: 5, name: "Chicken Tikka (Full)", price: 180, category: "Non-Veg", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400" },
    { id: 6, name: "Cold Drink (750ml)", price: 45, category: "Drinks", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" }
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
    if (!address || address.length < 5) return alert("Kripya Khaperkheda ka sahi address daalein!");
    const list = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
    const msg = `*Khaperkheda Delivery - Naya Order*\n\n*Items:* ${list}\n*Total Bill:* ₹${total}\n*Customer:* ${phone}\n*Address:* ${address}`;
    window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (view === 'login') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ff4757', height: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginTop: '80px', fontSize: '2.5rem', fontWeight: 'bold' }}>Khaperkheda Delivery</h1>
      <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Swaad Khaperkheda Ka!</p>
      <div style={{ marginTop: '60px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>+91</span>
          <input type="tel" placeholder="Mobile Number" onChange={(e)=>setPhone(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none', fontSize: '18px' }} />
        </div>
        <button onClick={()=>setView('otp')} style={{ width: '100%', padding: '18px', borderRadius: '15px', border: 'none', backgroundColor: '#333', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Send OTP</button>
      </div>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', height: '100vh' }}>
      <h2 style={{ color: '#ff4757', marginTop: '50px' }}>Verify Number</h2>
      <p style={{ color: '#666' }}>Test Code '120722' ka use karein</p>
      <input type="text" placeholder="000000" onChange={(e)=>setOtp(e.target.value)} style={{ width: '100%', padding: '15px', textAlign: 'center', fontSize: '28px', letterSpacing: '8px', margin: '40px 0', borderRadius: '15px', border: '2px solid #ddd', outlineColor: '#ff4757' }} />
      <button onClick={() => otp === '120722' ? setView('home') : alert('Galat OTP!')} style={{ width: '100%', padding: '18px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px' }}>Login</button>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '140px' }}>
      {/* Navbar */}
      <header style={{ backgroundColor: '#ff4757', color: 'white', padding: '20px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Khaperkheda Menu</h2>
          <Smartphone size={24} onClick={() => setView('login')} />
        </div>
      </header>

      {/* Menu List */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Aaj Ki Dishes 🍛</h3>
        {menuItems.map(item => (
          <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', display: 'flex', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', backgroundColor: item.category === 'Veg' ? '#e7f9ed' : '#feecef', color: item.category === 'Veg' ? '#2ed573' : '#ff4757', padding: '3px 8px', borderRadius: '5px', fontWeight: 'bold' }}>{item.category}</span>
                <h4 style={{ margin: '8px 0 5px 0', fontSize: '1.1rem' }}>{item.name}</h4>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => addToCart(item)} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer' }}>ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '20px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', boxShadow: '0 -10px 30px rgba(0,0,0,0.15)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '12px', marginBottom: '15px' }}>
            <MapPin size={20} color="#ff4757" style={{ marginRight: '10px' }} />
            <input type="text" placeholder="Enter Address (Khaperkheda Area)" onChange={(e)=>setAddress(e.target.value)} style={{ border: 'none', background: 'none', width: '100%', outline: 'none', fontSize: '15px' }} />
          </div>
          <button onClick={sendOrder} style={{ width: '100%', backgroundColor: '#2ed573', color: 'white', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart size={22} /> Confirm Order (₹{total})
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
