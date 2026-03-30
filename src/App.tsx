import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, MapPin, Phone, MessageCircle, Clock, Truck } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Biryani');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Splash screen timer
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 220, rating: "4.8", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 90, full: 160, rating: "4.2", img: "https://images.unsplash.com/photo-154332658-9273644877ed?w=500" },
      { id: 'b3', name: "Special Egg Biryani", half: 100, full: 180, rating: "4.4", img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500" },
      { id: 'b4', name: "Paneer Tikka Biryani", half: 120, full: 210, rating: "4.5", img: "https://images.unsplash.com/photo-1512058560566-43346af0c34b?w=500" },
      { id: 'b5', name: "Mutton Dum Biryani", half: 180, full: 320, rating: "4.9", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" },
      { id: 'b6', name: "Chicken Tikka Biryani", half: 140, full: 240, rating: "4.6", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500" },
      { id: 'b7', name: "Soya Chaap Biryani", half: 100, full: 180, rating: "4.1", img: "https://images.unsplash.com/photo-1645177623570-ad4b5a8050e5?w=500" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.5", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.2", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500" },
      { id: 's3', name: "Onion Uttapam", price: 95, rating: "4.3", img: "https://images.unsplash.com/photo-1627387115324-75883bb21b05?w=500" },
      { id: 's4', name: "Idli Sambhar (2 Pc)", price: 60, rating: "4.4", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500" },
      { id: 's5', name: "Paneer Masala Dosa", price: 140, rating: "4.6", img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500" },
      { id: 's6', name: "Cheese Chilli Dosa", price: 150, rating: "4.7", img: "https://images.unsplash.com/photo-1639023477161-0b5c179421f2?w=500" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500" },
      { id: 'p3', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500" },
      { id: 'p4', name: "Spicy Chicken Pizza", s: 229, m: 429, l: 649, rating: "4.7", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=500" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.unsplash.com/photo-1628163901980-dfd35e120150?w=500" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://images.unsplash.com/photo-1605663714271-e00b1473266e?w=500" }
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

  const handleCheckout = () => {
    if (!customerName || !address) { alert("Please enter Name and Address"); return; }
    navigator.geolocation.getCurrentPosition((pos) => {
      const mapsLink = `http://maps.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      const msg = `🔥 *New Order from Khaperkhedaa Court*\n\n👤 *Customer:* ${customerName}\n📍 *Address:* ${address}\n🗺️ *Location:* ${mapsLink}\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty}`).join('\n')}\n\n💰 *Total:* ₹${total}`;
      window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`);
    });
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E23744', color: '#fff' }}>
        <Utensils size={80} style={{ marginBottom: '20px' }} />
        <h1 style={{ fontWeight: 900 }}>Khaperkhedaa Court</h1>
        <p>Nagpur's Best Flavors Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '220px' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <div>
          <h1 style={{ color: '#E23744', margin: 0, fontWeight: 900, fontSize: '22px' }}>Khaperkhedaa Court</h1>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <a href="tel:+919699343711" style={{ fontSize: '11px', color: '#666', textDecoration: 'none' }}>📞 Call Help</a>
            <a href="https://wa.me/919699343711" style={{ fontSize: '11px', color: '#666', textDecoration: 'none' }}>💬 Chat</a>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={28} color="#E23744" />
          {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px' }}>{cart.length}</span>}
        </div>
      </header>

      <div style={{ padding: '15px' }}>
        <div style={{ backgroundColor: '#E23744', borderRadius: '15px', padding: '20px', color: '#fff', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Hungry in Nagpur?</h2>
          <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Fastest delivery in Khaperkheda.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px' }}>
          {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', backgroundColor: activeTab === tab ? '#E23744' : '#fff', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              {tab}
            </button>
          ))}
        </div>

        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <span style={{ fontSize: '10px', color: '#24963F', fontWeight: 'bold' }}>{item.rating} ★</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {activeTab === 'Pizza' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'S', item.s)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '10px' }}>S ₹{item.s}</button>
                    <button onClick={()=>addToCart(item, 'M', item.m)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '10px' }}>M ₹{item.m}</button>
                    <button onClick={()=>addToCart(item, 'L', item.l)} style={{ flex: 1, padding: '8px 2px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '10px' }}>L ₹{item.l}</button>
                  </>
                ) : activeTab === 'Biryani' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '8px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px' }}>Half ₹{item.half}</button>
                    <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '8px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px' }}>Full ₹{item.full}</button>
                  </>
                ) : (
                  <button onClick={()=>addToCart(item, 'Add', item.price)} style={{ flex: 1, padding: '10px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px' }}>Add ₹{item.price}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px', borderRadius: '20px 20px 0 0', boxShadow: '0 -10px 20px rgba(0,0,0,0.1)' }}>
          <input type="text" placeholder="👤 Full Name" onChange={(e)=>setCustomerName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '8px', boxSizing: 'border-box' }} />
          <input type="text" placeholder="🏠 Delivery Address" onChange={(e)=>setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '8px', boxSizing: 'border-box' }} />
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '18px' }}>Place Order (₹{total})</button>
        </div>
      )}
    </div>
  );
}
