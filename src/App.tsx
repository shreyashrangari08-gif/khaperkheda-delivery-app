import React, { useState } from 'react';
import { ShoppingCart, Star, Clock } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // Sahi images ke saath menu items
  const menuItems = [
    { id: 1, name: "Hyderabadi Veg Biryani", half: 70, full: 130, rating: "4.2", time: "25 min", img: "https://images.unsplash.com/photo-154332658-9273644877ed?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Special Chicken Biryani", half: 80, full: 150, rating: "4.5", time: "30 min", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Steamed Veg Momos", full: 120, rating: "4.0", time: "15 min", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Farmhouse Fresh Pizza", half: 80, full: 250, rating: "4.3", time: "35 min", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Paneer Tikka Grill", full: 180, rating: "4.4", time: "20 min", img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Crispy Chicken Lollipop", half: 160, full: 300, rating: "4.6", time: "25 min", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80" }
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
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f8f8f8', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900, letterSpacing: '-1px' }}>Khaperkhedaa</h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Delivery to Nagpur</p>
        </div>
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={24} color="#333" />
          {cart.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#E23744', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>{cart.length}</span>}
        </div>
      </header>

      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px', fontWeight: 600 }}>Inspiration for your first order</h3>
        {menuItems.map(item => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '20px', border: '1px solid #efefef', transition: '0.3s' }}>
            <img src={item.img} style={{ width: '130px', height: '130px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#1c1c1c' }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 5px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>{item.rating} <Star size={8} fill="white" /></span>
                  <span style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {item.time}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {item.half && (
                  <button onClick={()=>addToCart(item, 'Half', item.half!)} style={{ flex: 1, padding: '8px 4px', border: '1px solid #E23744', borderRadius: '8px', background: 'none', color: '#E23744', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Half ₹{item.half}
                  </button>
                )}
                <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '8px 4px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Full ₹{item.full}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '1px solid #eee', boxSizing: 'border-box', boxShadow: '0 -5px 20px rgba(0,0,0,0.1)', borderRadius: '20px 20px 0 0' }}>
          <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>Your Details</div>
          <input 
            type="text" 
            placeholder="Enter full delivery address..." 
            onChange={(e)=>setAddress(e.target.value)} 
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '12px', boxSizing: 'border-box', fontSize: '14px' }} 
          />
          <button 
            onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`🍔 *New Order from Khaperkhedaa App*\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.type}) x ${i.qty}`).join('\n')}\n\n*Total Amount:* ₹${total}\n*Address:* ${address}\n\n_Please confirm this order._`)}`)} 
            style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 10px rgba(226, 55, 68, 0.3)' }}
          >
            Place Order • ₹{total}
          </button>
        </div>
      )}
    </div>
  );
}
