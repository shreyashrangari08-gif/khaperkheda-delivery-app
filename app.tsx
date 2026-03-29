import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, Plus, Minus, PhoneCall, MapPin } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuItems = [
    { id: 1, name: "Veg Biryani", half: 70, full: 130, veg: true, img: "https://images.unsplash.com/photo-1543352658-9273644877ed?w=400" },
    { id: 2, name: "Non-Veg Biryani", half: 80, full: 150, veg: false, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { id: 3, name: "Momos", full: 120, veg: true, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=400" },
    { id: 4, name: "Pizza", half: 80, full: 250, veg: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
    { id: 5, name: "Paneer Tikka", full: 180, veg: true, img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?w=400" },
    { id: 6, name: "Chicken Lollipop", half: 160, full: 300, veg: false, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" }
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

  const sendOrder = () => {
    if (!address) return alert("Delivery Address daalein!");
    const list = cart.map(i => `${i.name}(${i.type})x${i.qty}`).join(', ');
    const msg = `*Order: Khaperkheda*\nItems: ${list}\nTotal: ₹${total}\nAddress: ${address}`;
    window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ backgroundColor: '#fff', padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ color: '#ff7920', margin: 0 }}>🏠 Khaperkheda</h2>
        <div style={{ color: '#ff7920', fontWeight: 'bold' }}><ShoppingCart size={20} style={{display:'inline'}} /> {cart.length}</div>
      </header>

      <div style={{ padding: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
            <img src={item.img} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
            <div style={{ padding: '8px' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>{item.name}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {item.half && <button onClick={()=>addToCart(item, 'H', item.half)} style={{ fontSize: '10px', padding: '4px', border: '1px solid #ff7920', borderRadius: '5px', background: 'none', color: '#ff7920' }}>H:₹{item.half}</button>}
                {item.full && <button onClick={()=>addToCart(item, 'F', item.full)} style={{ fontSize: '10px', padding: '4px', background: '#ff7920', color: '#fff', border: 'none', borderRadius: '5px' }}>F:₹{item.full}</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '1px solid #eee', boxSizing: 'border-box' }}>
          <input type="text" placeholder="Address..." onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '10px' }} />
          <button onClick={sendOrder} style={{ width: '100%', backgroundColor: '#ff7920', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold' }}>
            Checkout ₹{total}
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

