import React, { useState } from 'react';
import { ShoppingCart, Star, Clock, Pizza, Utensils, Coffee, IceCream } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Biryani');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Special Chicken Biryani", half: 110, full: 190, rating: "4.7", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 90, full: 160, rating: "4.2", img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'b3', name: "Egg Biryani (Nagpur Special)", half: 100, full: 170, rating: "4.4", img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'p3', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.4", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.1", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 's3', name: "Onion Uttapam", price: 90, rating: "4.2", img: "https://images.pexels.com/photos/13063293/pexels-photo-13063293.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.pexels.com/photos/10313176/pexels-photo-10313176.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://images.pexels.com/photos/10313178/pexels-photo-10313178.jpeg?auto=compress&cs=tinysrgb&w=400" }
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
        <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900 }}>Khaperkhedaa</h2>
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={24} color="#E23744" />
          {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }}>{cart.length}</span>}
        </div>
      </header>

      {/* Tabs / Category Navigation */}
      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '15px', backgroundColor: '#fff', borderBottom: '1px solid #eee', whiteSpace: 'nowrap', sticky: 'top' }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '25px', 
              border: activeTab === tab ? 'none' : '1px solid #ddd', 
              backgroundColor: activeTab === tab ? '#E23744' : '#fff',
              color: activeTab === tab ? '#fff' : '#555',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {tab === 'Biryani' && '🍗 '}
            {tab === 'South' && '🍛 '}
            {tab === 'Pizza' && '🍕 '}
            {tab === 'Sweets' && '🍰 '}
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '15px' }}>{activeTab} Special</h3>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '15px' }}>
            <img src={item.img} style={{ width: '130px', height: '130px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 700 }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>{item.rating} ★</span>
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
          <input 
            type="text" 
            placeholder="📍 Enter Delivery Address..." 
            onChange={(e)=>setAddress(e.target.value)} 
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '12px', boxSizing: 'border-box' }} 
          />
          <button 
            onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`🔥 *New Order from Khaperkhedaa Court*\n\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty} - ₹${i.price * i.qty}`).join('\n')}\n\n💰 *Total:* ₹${total}\n📍 *Address:* ${address}`)}`)} 
            style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '18px' }}
          >
            Place Order (₹{total})
          </button>
        </div>
      )}
    </div>
  );
}
