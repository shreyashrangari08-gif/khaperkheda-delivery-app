import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, Menu, Clock, Plus, MapPin, PhoneCall, ChevronRight } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuItems = [
    { id: 1, name: "Veg Biryani", halfPrice: 70, fullPrice: 130, veg: true, img: "https://images.unsplash.com/photo-1543352658-9273644877ed?w=500" },
    { id: 2, name: "Non-Veg Biryani", halfPrice: 80, fullPrice: 150, veg: false, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" },
    { id: 3, name: "Momos", fullPrice: 120, veg: true, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=500" },
    { id: 4, name: "Pizza", halfPrice: 80, fullPrice: 250, veg: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 5, name: "Paneer Tikka", fullPrice: 180, veg: true, img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?w=500" },
    { id: 6, name: "Chicken Lollipop", halfPrice: 160, fullPrice: 300, veg: false, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" }
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
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', width: '100%' }}>
      
      {/* Header - Mobile Responsive */}
      <header style={{ backgroundColor: '#fff', padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ color: '#ff7920', margin: 0, fontSize: '1.2rem' }}>🏠 Khaperkhedaa</h2>
        <div style={{ border: '1px solid #ff7920', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#ff7920' }}>
          <ShoppingCart size={18} />
          <span style={{ fontWeight: 'bold' }}>{cart.length}</span>
        </div>
      </header>

      {/* Hero Banner - Chhota Size */}
      <div style={{ margin: '15px', height: '150px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: '#fff' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Hungry?</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Best Biryani & Pizza in Khaperkhedaa</p>
        </div>
      </div>

      {/* Menu List - Desktop Site style (Ek line mein 2 dishes) */}
      <div style={{ padding: '0 15px 150px' }}>
        <h3 style={{ marginBottom: '15px' }}>Our Menu</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {menuItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
              <div style={{ position: 'relative' }}>
                <img src={item.img} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#fff', padding: '2px', borderRadius: '3px' }}>
                   <div style={{ width: '8px', height: '8px', background: item.veg ? '#2ed573' : '#ff4757', borderRadius: '50%' }} />
                </div>
              </div>
              <div style={{ padding: '10px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', height: '35px', overflow: 'hidden' }}>{item.name}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                  {item.halfPrice && <button onClick={() => addToCart(item, 'Half', item.halfPrice)} style={{ fontSize: '9px', padding: '4px 8px', borderRadius: '10px', border: '1px solid #ff7920', background: 'none', color: '#ff7920' }}>H: ₹{item.halfPrice}</button>}
                  {item.fullPrice && <button onClick={() => addToCart(item, 'Full', item.fullPrice)} style={{ fontSize: '9px', padding: '4px 8px', borderRadius: '10px', background: '#ff7920', color: '#fff', border: 'none' }}>F: ₹{item.fullPrice}</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Need Help */}
      <a href="tel:919699343711" style={{ position: 'fixed', bottom: '100px', right: '20px', background: '#fff', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textDecoration: 'none' }}>
        <PhoneCall color="#ff7920" size={24} />
      </a>

      {/* Checkout Bar */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '1px solid #eee', boxShadow: '0 -5px 20px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
          <input type="text" placeholder="Delivery Address..." onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '10px', fontSize: '14px' }} />
          <button onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`Order: ${cart.map(i=>`${i.name}(${i.type})x${i.qty}`).join(', ')}\nTotal: ₹${total}\nAddress: ${address}`)}`)} style={{ width: '100%', backgroundColor: '#ff7920', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' }}>
            Checkout ₹{total}
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
