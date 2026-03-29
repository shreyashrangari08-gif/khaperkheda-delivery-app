import React, { useState } from 'react';
import { ShoppingCart, Star, Clock, UtensilsCrossed } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menu = {
    pizzas: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    biryani: [
      { id: 'b1', name: "Special Chicken Biryani", half: 110, full: 190, rating: "4.7", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 90, full: 160, rating: "4.2", img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    southIndian: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.4", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.1", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.pexels.com/photos/10313176/pexels-photo-10313176.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ]
  };

  const addToCart = (item: any, sizeType: string, price: number) => {
    const cartId = `${item.id}-${sizeType}`;
    const existing = cart.find(i => i.cartId === cartId);
    if (existing) {
      setCart(cart.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { cartId, name: item.name, sizeType, price, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const Section = ({ title, items, type }: any) => (
    <div style={{ marginBottom: '25px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1c1c1c', marginBottom: '15px', paddingLeft: '5px' }}>{title}</h3>
      {items.map((item: any) => (
        <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '15px', border: '1px solid #f0f0f0' }}>
          <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
          <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600 }}>{item.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }}>{item.rating} ★</span>
                <span style={{ fontSize: '10px', color: '#666' }}>30 min</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {type === 'pizza' ? (
                <>
                  <button onClick={()=>addToCart(item, 'S', item.s)} style={{ flex: 1, padding: '6px 2px', border: '1px solid #E23744', borderRadius: '6px', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>S ₹{item.s}</button>
                  <button onClick={()=>addToCart(item, 'M', item.m)} style={{ flex: 1, padding: '6px 2px', border: '1px solid #E23744', borderRadius: '6px', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>M ₹{item.m}</button>
                  <button onClick={()=>addToCart(item, 'L', item.l)} style={{ flex: 1, padding: '6px 2px', background: '#E23744', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>L ₹{item.l}</button>
                </>
              ) : type === 'biryani' ? (
                <>
                  <button onClick={()=>addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '6px', border: '1px solid #E23744', borderRadius: '6px', color: '#E23744', fontSize: '10px', fontWeight: 'bold' }}>Half ₹{item.half}</button>
                  <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '6px', background: '#E23744', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>Full ₹{item.full}</button>
                </>
              ) : (
                <button onClick={()=>addToCart(item, 'Portion', item.price)} style={{ flex: 1, padding: '8px', background: '#E23744', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Add to Cart ₹{item.price}</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '180px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 800 }}>Khaperkhedaa Court</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Nagpur's Best Flavors</p>
        </div>
        <ShoppingCart size={24} color="#E23744" />
      </header>

      <div style={{ padding: '15px' }}>
        <Section title="🍕 Pizza Junction" items={menu.pizzas} type="pizza" />
        <Section title="🍗 Biryani House" items={menu.biryani} type="biryani" />
        <Section title="🍛 South Indian Express" items={menu.southIndian} type="south" />
        <Section title="🍰 Sweet Tooth" items={menu.sweets} type="sweet" />
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '2px solid #E23744', boxSizing: 'border-box', borderRadius: '20px 20px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}>
          <input 
            type="text" 
            placeholder="Delivery Address..." 
            onChange={(e)=>setAddress(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box' }} 
          />
          <button 
            onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`🚀 *New Multi-Order from Khaperkhedaa Court*\n\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty} - ₹${i.price * i.qty}`).join('\n')}\n\n*Total Amount:* ₹${total}\n*Address:* ${address}`)}`)} 
            style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '16px' }}
          >
            Confirm Order (₹{total})
          </button>
        </div>
      )}
    </div>
  );
}
