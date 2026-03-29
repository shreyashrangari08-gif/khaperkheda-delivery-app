import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, Menu, Plus, MapPin, PhoneCall, Search } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuItems = [
    { id: 1, name: "Veg Biryani", half: 70, full: 130, veg: true, img: "https://images.unsplash.com/photo-1543352658-92736448777d?w=500" },
    { id: 2, name: "Non-Veg Biryani", half: 80, full: 150, veg: false, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" },
    { id: 3, name: "Momos", full: 120, veg: true, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=500" },
    { id: 4, name: "Pizza", half: 80, full: 250, veg: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 5, name: "Paneer Tikka", full: 180, veg: true, img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?w=500" },
    { id: 6, name: "Chicken Lollipop", half: 160, full: 300, veg: false, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" }
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

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {/* Top Header */}
      <header style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#fff' }}>
        <h2 style={{ color: '#ff7920', margin: 0, fontSize: '1.2rem' }}>Khaperkhedaa</h2>
        <div style={{ background: '#fff5ed', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ff7920', fontWeight: 'bold' }}>
          <ShoppingCart size={18} /> {cart.length}
        </div>
      </header>

      {/* Hungry Banner */}
      <div style={{ margin: '15px', height: '180px', borderRadius: '25px', overflow: 'hidden', position: 'relative', background: '#000' }}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: '#fff' }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Hungry?</h1>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Best Biryani in Khaperkhedaa</p>
        </div>
      </div>

      {/* Dishes List - Full Width */}
      <div style={{ padding: '0 15px 150px' }}>
        <h3 style={{ marginBottom: '15px' }}>Our Menu</h3>
        {menuItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', border: '1px solid #f9f9f9' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            <div style={{ padding: '12px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <h4 style={{ margin: 0 }}>{item.name}</h4>
                 <div style={{ width: '12px', height: '12px', border: `1px solid ${item.veg ? 'green' : 'red'}`, padding: '1px' }}>
                    <div style={{ width: '100%', height: '100%', background: item.veg ? 'green' : 'red', borderRadius: '50%' }} />
                 </div>
              </div>
              <p style={{ fontSize: '12px', color: '#888', margin: '5px 0' }}>Fresh & Hot delivery</p>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                {item.half && <button onClick={() => addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '6px', borderRadius: '10px', border: '1px solid #ff7920', background: 'none', color: '#ff7920', fontSize: '11px', fontWeight: 'bold' }}>H: ₹{item.half}</button>}
                {item.full && <button onClick={() => addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '6px', borderRadius: '10px', background: '#ff7920', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 'bold' }}>F: ₹{item.full}</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Call Button */}
      <a href="tel:9699343711" style={{ position: 'fixed', bottom: '110px', right: '20px', background: '#ff7920', padding: '15px', borderRadius: '50%', color: '#fff', boxShadow: '0 4px 15px rgba(255,121,32,0.4)' }}>
        <PhoneCall size={24} />
      </a>

      {/* Checkout Section */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#fff', padding: '15px', borderTop: '1px solid #eee', boxShadow: '0 -5px 20px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
          <input type="text" placeholder="Enter Khaperkheda Address..." onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '10px' }} />
          <button onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`Khaperkhedaa Order:\n${cart.map(i=>`${i.name}(${i.type})x${i.qty}`).join(', ')}\nTotal: ₹${total}\nAddress: ${address}`)}`)} style={{ width: '100%', background: '#ff7920', color: '#fff', padding: '15px', borderRadius: '15px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Checkout ₹{total}
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
