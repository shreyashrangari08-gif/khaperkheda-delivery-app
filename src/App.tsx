import React, { useState } from 'react';
import { ShoppingCart, Star, Clock } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // Naye aur working HD image links
  const menuItems = [
    { id: 1, name: "Hyderabadi Veg Biryani", half: 70, full: 130, rating: "4.2", time: "25 min", img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, name: "Special Chicken Biryani", half: 80, full: 150, rating: "4.5", time: "30 min", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, name: "Steamed Veg Momos", full: 120, rating: "4.0", time: "15 min", img: "https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 4, name: "Farmhouse Fresh Pizza", half: 80, full: 250, rating: "4.3", time: "35 min", img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 5, name: "Paneer Tikka Grill", full: 180, rating: "4.4", time: "20 min", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 6, name: "Crispy Chicken Lollipop", half: 160, full: 300, rating: "4.6", time: "25 min", img: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=400" }
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
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <h2 style={{ color: '#E23744', margin: 0, fontWeight: 800 }}>Khaperkhedaa</h2>
        <ShoppingCart size={24} color="#E23744" />
      </header>

      <div style={{ padding: '15px' }}>
        <p style={{ fontWeight: 600, fontSize: '18px', color: '#333' }}>Order delicious food!</p>
        {menuItems.map(item => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', marginBottom: '15px' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{item.name}</h4>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }}>{item.rating} ★</span>
                <span style={{ fontSize: '10px', color: '#666' }}>{item.time}</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {item.half && (
                  <button onClick={()=>addToCart(item, 'Half', item.half!)} style={{ flex: 1, padding: '6px', border: '1px solid #E23744', borderRadius: '6px', background: 'none', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>
                    Half ₹{item.half}
                  </button>
                )}
                <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '6px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>
                  Full ₹{item.full}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '2px solid #E23744', boxSizing: 'border-box' }}>
          <input 
            type="text" 
            placeholder="Delivery Address..." 
            onChange={(e)=>setAddress(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box' }} 
          />
          <button 
            onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`New Order:\n${cart.map(i=>`${i.name}(${i.type}) x ${i.qty}`).join('\n')}\nTotal: ₹${total}\nAddress: ${address}`)}`)} 
            style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '10px', fontWeight: 'bold', border: 'none' }}
          >
            Place Order (₹{total})
          </button>
        </div>
      )}
    </div>
  );
}
