import React, { useState } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, Clock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Biryani');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 220, rating: "4.8", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 90, full: 160, rating: "4.2", img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b3', name: "Special Egg Biryani", half: 100, full: 180, rating: "4.4", img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b4', name: "Paneer Tikka Biryani", half: 120, full: 210, rating: "4.5", img: "https://images.unsplash.com/photo-154332658-9273644877ed?w=400" },
      { id: 'b5', name: "Mutton Dum Biryani", half: 180, full: 320, rating: "4.9", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
      { id: 'b6', name: "Chicken Tikka Biryani", half: 140, full: 240, rating: "4.6", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400" },
      { id: 'b7', name: "Soya Chaap Biryani", half: 100, full: 180, rating: "4.1", img: "https://images.unsplash.com/photo-1645177623570-ad4b5a8050e5?w=400" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.5", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.2", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's3', name: "Onion Uttapam", price: 95, rating: "4.3", img: "https://images.pexels.com/photos/13063293/pexels-photo-13063293.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's4', name: "Idli Sambhar (2 Pc)", price: 60, rating: "4.4", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
      { id: 's5', name: "Paneer Masala Dosa", price: 140, rating: "4.6", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
      { id: 's6', name: "Paper Plain Dosa", price: 80, rating: "4.0", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p3', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p4', name: "Spicy Chicken Pizza", s: 229, m: 429, l: 649, rating: "4.7", img: "https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p5', name: "Corn & Cheese Pizza", s: 159, m: 299, l: 499, rating: "4.2", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400" },
      { id: 'p6', name: "Mexican Green Wave", s: 210, m: 399, l: 610, rating: "4.4", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400" },
      { id: 'p7', name: "Pepperoni Passion", s: 250, m: 480, l: 750, rating: "4.8", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=400" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.unsplash.com/photo-1628163901980-dfd35e120150?w=400" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://images.unsplash.com/photo-1605663714271-e00b1473266e?w=400" },
      { id: 'sw4', name: "Hot Jalebi (250g)", price: 120, rating: "4.6", img: "https://images.unsplash.com/photo-1589113473042-430349cc993a?w=400" },
      { id: 'sw5', name: "Motichoor Ladoo (4 Pc)", price: 60, rating: "4.5", img: "https://images.unsplash.com/photo-1599839619722-397514118837?w=400" },
      { id: 'sw6', name: "Bengali Rasgulla (2 Pc)", price: 40, rating: "4.3", img: "https://images.unsplash.com/photo-1630132174300-3486119107cc?w=400" }
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

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '180px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900 }}>Khaperkhedaa Court</h2>
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={24} color="#E23744" />
          {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }}>{cart.length}</span>}
        </div>
      </header>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '15px', backgroundColor: '#fff', borderBottom: '1px solid #eee', whiteSpace: 'nowrap', sticky: 'top', zIndex: 9 }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '25px', border: activeTab === tab ? 'none' : '1px solid #ddd', backgroundColor: activeTab === tab ? '#E23744' : '#fff', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold' }}>
            {tab === 'Biryani' && '🍗 '}{tab === 'South' && '🍛 '}{tab === 'Pizza' && '🍕 '}{tab === 'Sweets' && '🍰 '}{tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '15px' }}>{activeTab} Selection</h3>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '15px' }}>
            <img src={item.img} style={{ width: '130px', height: '130px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 700 }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>{item.rating} ★</span>
                  <span style={{ fontSize: '10px', color: '#666' }}>30 min</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '5px' }}>
                {activeTab === 'Pizza' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'S', item.s)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px', fontWeight: 'bold' }}>S ₹{item.s}</button>
                    <button onClick={()=>addToCart(item, 'M', item.m)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px', fontWeight: 'bold' }}>M ₹{item.m}</button>
                    <button onClick={()=>addToCart(item, 'L', item.l)} style={{ flex: 1, padding: '8px 2px', background: '#E23744', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>L ₹{item.l}</button>
                  </>
                ) : activeTab === 'Biryani' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '10px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px', fontWeight: 'bold' }}>Half ₹{item.half}</button>
                    <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '10px', background: '#E23744', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>Full ₹{item.full}</button>
                  </>
                ) : (
                  <button onClick={()=>addToCart(item, 'Portion', item.price)} style={{ flex: 1, padding: '10px', background: '#E23744', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Add ₹{item.price}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderTop: '2px solid #E23744', boxSizing: 'border-box', borderRadius: '25px 25px 0 0', boxShadow: '0 -10px 20px rgba(0,0,0,0.1)' }}>
          <input type="text" placeholder="📍 Enter Delivery Address..." onChange={(e)=>setAddress(e.target.
                                                                                                 
