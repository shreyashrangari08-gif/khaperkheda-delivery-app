import React, { useState } from 'react';
import { ShoppingCart, Plus, PhoneCall } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuItems = [
    { id: 1, name: "Veg Biryani", half: 70, full: 130, img: "https://images.unsplash.com/photo-154332658-9273644877ed?w=400" },
    { id: 2, name: "Non-Veg Biryani", half: 80, full: 150, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { id: 3, name: "Momos", full: 120, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=400" },
    { id: 4, name: "Pizza", half: 80, full: 250, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
    { id: 5, name: "Paneer Tikka", full: 180, img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?w=400" },
    { id: 6, name: "Chicken Lollipop", half: 160, full: 300, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" }
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
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <h2 style={{ color: '#ff7920', margin: 0 }}>Khaperkhedaa</h2>
        <div style={{ color: '#ff7920', fontWeight: 'bold' }}>
          <ShoppingCart size={20} style={{display:'inline', verticalAlign:'middle', marginRight:'5px'}} /> 
          {cart.length}
        </div>
      </header>

      <div style={{ padding: '15px' }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '15px', border: '1px solid #f0f0f0' }}>
            <img src={item.img} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '10px', flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {item.half && <button onClick={()=>addToCart(item, 'Half', item.half!)} style={{ flex: 1, padding: '6px', border: '1px solid #ff7920', borderRadius: '8px', background: 'none', color: '#ff7920', fontSize: '11px', fontWeight: 'bold' }}>Half ₹{item.half}</button>}
                {item.full && <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '6px', background: '#ff7920', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>Full ₹{item.full}</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '1px solid #eee', boxSizing: 'border-box', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' }}>
          <input type="text" placeholder="Delivery Address..." onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '10px' }} />
          <button onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`Order: ${cart.map(i=>`${i.name}(${i.type})x${i.qty}`).join(', ')}\nTotal: ₹${total}\nAddress: ${address}`)}`)} style={{ width: '100%', backgroundColor: '#ff7920', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '1.1rem' }}>
            Confirm (₹{total})
          </button>
        </div>
      )}
    </div>
  );
}
