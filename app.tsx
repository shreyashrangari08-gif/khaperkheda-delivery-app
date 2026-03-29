import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, Menu, Clock, Search, Plus, MapPin, PhoneCall, ChevronRight } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  const menuItems = [
    { id: 1, name: "Veg Biryani", price: 70, halfPrice: 70, fullPrice: 130, veg: true, img: "https://images.unsplash.com/photo-1543352658-9273644877ed?w=500" },
    { id: 2, name: "Non-Veg Biryani", price: 80, halfPrice: 80, fullPrice: 150, veg: false, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" },
    { id: 3, name: "Momos", price: 120, fullPrice: 120, veg: true, img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=500" },
    { id: 4, name: "Pizza", price: 80, sizes: { normal: 80, medium: 150, large: 250 }, veg: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 5, name: "Paneer Tikka", price: 180, fullPrice: 180, veg: true, img: "https://images.unsplash.com/photo-1567184109411-47a7a3928570?w=500" },
    { id: 6, name: "Chicken Lollipop", price: 160, options: { "6 Pcs": 160, "12 Pcs": 300 }, veg: false, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" }
  ];

  const addToCart = (item: any, optionName: string, price: number) => {
    const cartId = `${item.id}-${optionName}`;
    const existing = cart.find(i => i.cartId === cartId);
    if (existing) {
      setCart(cart.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { cartId, name: item.name, optionName, price, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar (Left Menu) */}
      <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #eee', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: '#ff7920', display: 'flex', alignItems: 'center', gap: '10px' }}>🏠 Khaperkhedaa</h2>
        <div style={{ backgroundColor: '#ff7920', color: '#fff', padding: '12px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <Menu size={20} /> Menu
        </div>
        <div style={{ color: '#666', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <Clock size={20} /> Order History
        </div>
        
        {/* Help Card */}
        <div style={{ marginTop: 'auto', backgroundColor: '#fff5ed', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>
          <div style={{ background: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
            <PhoneCall size={20} color="#ff7920" />
          </div>
          <h4 style={{ margin: '0 0 5px 0' }}>Need Help?</h4>
          <p style={{ fontSize: '11px', color: '#666', margin: '0 0 10px 0' }}>Call us directly for large orders.</p>
          <p style={{ fontWeight: 'bold', color: '#ff7920', margin: 0 }}>+91 96993 43711</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', height: '100vh' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #eee', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart size={18} color="#ff7920" />
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Cart <span style={{ color: '#ff7920' }}>{cart.length}</span></span>
          </div>
        </div>

        {/* Hero Banner */}
        <div style={{ width: '100%', height: '220px', borderRadius: '25px', overflow: 'hidden', position: 'relative', marginBottom: '30px', boxShadow: '0 10px 30px rgba(255,121,32,0.2)' }}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)', color: '#fff' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Hungry?</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Order the best Biryani, Momos and Pizza in Khaperkhedaa.</p>
          </div>
        </div>

        {/* Menu Section */}
        <h2 style={{ marginBottom: '20px' }}>Our Menu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {menuItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', position: 'relative' }}>
              <img src={item.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fff', borderRadius: '50%', padding: '4px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', border: `2px solid ${item.veg ? '#2ed573' : '#ff4757'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.veg ? '#2ed573' : '#ff4757' }} />
                </div>
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#999', margin: '0 0 15px 0' }}>Authentic flavor delivered fresh to your door.</p>
                
                {/* Options (Half/Full) */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                  {item.halfPrice && (
                    <button onClick={() => addToCart(item, 'Half', item.halfPrice)} style={{ border: '1px solid #eee', padding: '5px 12px', borderRadius: '15px', fontSize: '11px', background: '#fff', cursor: 'pointer' }}>Half</button>
                  )}
                  {item.fullPrice && (
                    <button onClick={() => addToCart(item, 'Full', item.fullPrice)} style={{ border: '1px solid #eee', padding: '5px 12px', borderRadius: '15px', fontSize: '11px', background: '#fff', cursor: 'pointer' }}>Full</button>
                  )}
                  {item.sizes && Object.entries(item.sizes).map(([size, price]: any) => (
                    <button key={size} onClick={() => addToCart(item, size, price)} style={{ border: '1px solid #eee', padding: '5px 12px', borderRadius: '15px', fontSize: '11px', background: '#fff', cursor: 'pointer' }}>{size}</button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>₹{item.price}</span>
                  <button onClick={() => addToCart(item, 'Full', item.fullPrice || item.price)} style={{ backgroundColor: '#ff7920', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Checkout Bar */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', left: '270px', background: '#fff', padding: '15px 25px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <input type="text" placeholder="Delivery Address..." onChange={(e)=>setAddress(e.target.value)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #eee', width: '300px', marginRight: '20px' }} />
            <span style={{ fontWeight: 'bold' }}>Total: ₹{total}</span>
          </div>
          <button onClick={() => window.open(`https://wa.me/919699343711?text=${encodeURIComponent(`Order: ${cart.map(i=>`${i.name}(${i.optionName})x${i.qty}`).join(', ')}\nTotal: ₹${total}\nAddress: ${address}`)}`)} style={{ backgroundColor: '#ff7920', color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px' }}>
            Confirm Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
