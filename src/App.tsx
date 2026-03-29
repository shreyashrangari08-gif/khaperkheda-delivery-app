import React, { useState } from 'react';
import { ShoppingCart, Star, Clock } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  // SML sizes and Nagpur rates ke saath Pizza Menu
  const menuItems = [
    { id: 1, name: "Margherita Pizza (Classic Tomato & Mozzarella)", s: 149, m: 299, l: 499, rating: "4.1", time: "20-25 min", img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Paneer Tikka Pizza (Nagpur's Favorite Paneer Grill)", s: 199, m: 379, l: 599, rating: "4.6", time: "25-30 min", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Country Veggie Delight Pizza (Crunchy Veggies with Jalapeno)", s: 179, m: 349, l: 549, rating: "4.3", time: "25-30 min", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Double Cheese Margherita (More Cheese, More Love)", s: 189, m: 369, l: 569, rating: "4.5", time: "20-25 min", img: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, name: "Butter Chicken Pizza (Butter Chicken Gravy Base with Chicken Chunks)", s: 229, m: 429, l: 679, rating: "4.7", time: "30-35 min", img: "https://images.pexels.com/photos/17216117/pexels-photo-17216117/free-photo-of-top-view-of-sliced-pizza-with-toppings.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "Spicy Chicken Supreme Pizza (Spicy Chicken, Olives, and Cheese)", s: 249, m: 459, l: 729, rating: "4.8", time: "30-35 min", img: "https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  const addToCart = (item: any, size: string, price: number) => {
    const cartId = `${item.id}-${size}`;
    const existing = cart.find(i => i.cartId === cartId);
    if (existing) {
      setCart(cart.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { cartId, name: item.name, size, price, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <h2 style={{ color: '#E23744', margin: 0, fontWeight: 800 }}>Khaperkhedaa Pizza</h2>
        <ShoppingCart size={24} color="#E23744" />
      </header>

      <div style={{ padding: '15px' }}>
        <p style={{ fontWeight: 600, fontSize: '18px', color: '#333', marginBottom: '10px' }}>Select Your Perfect Pizza Size!</p>
        {menuItems.map(item => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', marginBottom: '15px' }}>
            <img src={item.img} style={{ width: '130px', height: '130px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{item.name}</h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }}>{item.rating} ★</span>
                  <span style={{ fontSize: '10px', color: '#666' }}>{item.time}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={()=>addToCart(item, 'Small', item.s)} style={{ flex: 1, padding: '6px', border: '1px solid #E23744', borderRadius: '6px', background: 'none', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>
                  S ₹{item.s}
                </button>
                <button onClick={()=>addToCart(item, 'Medium', item.m)} style={{ flex: 1, padding: '6px', border: '1px solid #E23744', borderRadius: '6px', background: 'none', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>
                  M ₹{item.m}
                </button>
                <button onClick={()=>addToCart(item, 'Large', item.l)} style={{ flex: 1, padding: '6px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>
                  L ₹{item.l}
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
            onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`🍔 *New Pizza Order from Khaperkhedaa App*\n\n*Items:*\n${cart.map(i=>`• ${i.name} (Size: ${i.size}) x ${i.qty}`).join('\n')}\n\n*Total Amount:* ₹${total}\n*Address:* ${address}\n\n_Please confirm this order._`)}`)} 
            style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '10px', fontWeight: 'bold', border: 'none' }}
          >
            Place Pizza Order (₹{total})
          </button>
        </div>
      )}
    </div>
  );
}
