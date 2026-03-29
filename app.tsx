import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, MapPin, Plus, Minus, Clock, Utensils, ChevronDown } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // Menu items with Half and Full options
  const menuItems = [
    { 
      id: 1, 
      name: "Special Chicken Biryani", 
      category: "Non-Veg", 
      img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      options: { half: 90, full: 160 }
    },
    { 
      id: 2, 
      name: "Chicken Tikka (Masala)", 
      category: "Non-Veg", 
      img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500",
      options: { half: 110, full: 200 }
    },
    { 
      id: 3, 
      name: "Veg Paneer Masala", 
      category: "Veg", 
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
      options: { half: 80, full: 150 }
    },
    { 
      id: 4, 
      name: "Dal Tadka Fry", 
      category: "Veg", 
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
      options: { half: 60, full: 110 }
    },
    { 
      id: 5, 
      name: "Jeera Rice", 
      category: "Veg", 
      img: "https://images.unsplash.com/photo-1534080564672-682856b419ff?w=500",
      options: { half: 50, full: 90 }
    },
    { 
      id: 6, 
      name: "Butter Tandoori Roti", 
      category: "Breads", 
      img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500",
      options: { single: 15 } // Roti sirf single hoti hai
    }
  ];

  const addToCart = (item: any, type: string, price: number) => {
    const cartId = `${item.id}-${type}`;
    const existing = cart.find(i => i.cartId === cartId);
    if (existing) {
      setCart(cart.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { cartId, name: item.name, type, price, qty: 1 }]);
    }
  };

  const removeFromCart = (cartId: string) => {
    const existing = cart.find(i => i.cartId === cartId);
    if (existing?.qty === 1) {
      setCart(cart.filter(i => i.cartId !== cartId));
    } else {
      setCart(cart.map(i => i.cartId === cartId ? { ...i, qty: i.qty - 1 } : i));
    }
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const sendOrder = () => {
    if (!address) return alert("Kripya Delivery Address daalein!");
    const list = cart.map(i => `${i.name} (${i.type}) x${i.qty}`).join(', ');
    const msg = `*Naya Order - Khaperkheda Delivery*\n\n*Items:* ${list}\n*Bill Total:* ₹${total}\n*Customer:* ${phone}\n*Address:* ${address}`;
    window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (view === 'login') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ff4757', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginTop: '70px', fontSize: '2.5rem' }}>Khaperkheda Delivery</h1>
      <p>Ghar ka Swaad, Khaperkheda ka Andaaz!</p>
      <div style={{ marginTop: '50px' }}>
        <input type="tel" placeholder="Mobile Number" onChange={(e)=>setPhone(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', marginBottom: '20px', fontSize: '18px' }} />
        <button onClick={()=>setView('otp')} style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>Get OTP</button>
      </div>
    </div>
  );

  if (view === 'otp') return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#ff4757' }}>OTP Verification</h2>
      <p>Test Code: 120722</p>
      <input type="text" placeholder="XXXXXX" onChange={(e)=>setOtp(e.target.value)} style={{ width: '100%', padding: '15px', textAlign: 'center', fontSize: '24px', margin: '30px 0', borderRadius: '12px', border: '2px solid #ddd' }} />
      <button onClick={() => otp === '120722' ? setView('home') : alert('Galat code!')} style={{ width: '100%', padding: '18px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>Login</button>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ backgroundColor: '#ff4757', color: 'white', padding: '15px 20px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Khaperkheda Menu</h2>
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={24} />
          {cart.length > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: 'white', color: '#ff4757', borderRadius: '50%', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>{cart.length}</span>}
        </div>
      </header>

      <div style={{ padding: '15px' }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex' }}>
              <img src={item.img} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt={item.name} />
              <div style={{ padding: '12px', flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  {item.options.half && (
                    <button onClick={() => addToCart(item, 'Half', item.options.half)} style={{ flex: 1, padding: '8px', border: '1px solid #ff4757', borderRadius: '8px', background: 'none', color: '#ff4757', fontSize: '12px', fontWeight: 'bold' }}>
                      Half ₹{item.options.half} +
                    </button>
                  )}
                  {item.options.full && (
                    <button onClick={() => addToCart(item, 'Full', item.options.full)} style={{ flex: 1, padding: '8px', border: '1px solid #ff4757', borderRadius: '8px', background: '#ff4757', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                      Full ₹{item.options.full} +
                    </button>
                  )}
                  {item.options.single && (
                    <button onClick={() => addToCart(item, 'Single', item.options.single)} style={{ flex: 1, padding: '8px', border: '1px solid #ff4757', borderRadius: '8px', background: '#ff4757', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                      Add ₹{item.options.single}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '20px', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', boxShadow: '0 -5px 20px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
          <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '10px' }}>
            {cart.map(c => (
              <div key={c.cartId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px' }}>
                <span>{c.name} ({c.type}) x{c.qty}</span>
                <span>₹{c.price * c.qty}</span>
              </div>
            ))}
          </div>
          <input type="text" placeholder="Khaperkheda Address..." onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '10px' }} />
          <button onClick={sendOrder} style={{ width: '100%', backgroundColor: '#2ed573', color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>
            Order via WhatsApp (₹{total})
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
