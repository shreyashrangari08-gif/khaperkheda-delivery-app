import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, MapPin, Phone, MessageCircle, Clock, UserCircle, X, Save, Tag, Coffee } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Biryani');
  const [cart, setCart] = useState<any[]>([]);
  
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('kdProfile');
    return saved ? JSON.parse(saved) : { name: '', phone: '', address: '' };
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    { id: 1, title: "FLAT 50% OFF", sub: "Nagpur Special Offer!", code: "WELCOME50", bg: "#E23744" },
    { id: 2, title: "FREE DELIVERY", sub: "Orders above ₹399 in Khaperkheda", code: "FREEDEL", bg: "#24963F" }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % offers.length), 5000);
    const splashTimer = setTimeout(() => setLoading(false), 2000);
    return () => { clearInterval(slideTimer); clearTimeout(splashTimer); };
  }, []);

  const saveProfile = () => {
    localStorage.setItem('kdProfile', JSON.stringify(tempProfile));
    setProfile(tempProfile);
    setIsProfileOpen(false);
    alert("Profile Updated!");
  };

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 240, rating: "4.8", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Chicken_Biryani_in_Chennai.jpg/640px-Chicken_Biryani_in_Chennai.jpg" },
      { id: 'b2', name: "Veg Hyderabadi Biryani", half: 100, full: 180, rating: "4.2", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Hyderabadi_Vegetable_Biryani.jpg/640px-Hyderabadi_Vegetable_Biryani.jpg" },
      { id: 'b3', name: "Egg Biryani Special", half: 110, full: 190, rating: "4.4", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Egg_biryani.jpg/640px-Egg_biryani.jpg" },
      { id: 'b4', name: "Paneer Biryani", half: 130, full: 230, rating: "4.5", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Paneer_Biryani.jpg/640px-Paneer_Biryani.jpg" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.5", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sree_Krishna_Bhavan.jpg/640px-Dosa_at_Sree_Krishna_Bhavan.jpg" },
      { id: 's2', name: "Idli Sambhar (3 Pc)", price: 70, rating: "4.4", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/640px-Idli_Sambar.JPG" },
      { id: 's3', name: "Medu Vada Platter", price: 90, rating: "4.4", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Vada_Sambhar.jpg/640px-Vada_Sambhar.jpg" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
      { id: 'p2', name: "Farmhouse Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.unsplash.com/photo-1574129624542-63d1f8da6c51?w=500" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Gulab_jamun_%28m_o%29.jpg/640px-Gulab_jamun_%28m_o%29.jpg" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ras_Malai_India.JPG/640px-Ras_Malai_India.JPG" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kaju_Katli_India.jpg/640px-Kaju_Katli_India.jpg" }
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
    if (!profile.name || !profile.phone || !profile.address) { setIsProfileOpen(true); return; }
    navigator.geolocation.getCurrentPosition((pos) => {
      const mapsLink = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      const msg = `🔥 *New Order: Khaperkhedaa Court*\n👤 *Name:* ${profile.name}\n📍 *Addr:* ${profile.address}\n🗺️ *Map:* ${mapsLink}\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty}`).join('\n')}\n💰 *Total:* ₹${total}`;
      window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`);
    });
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E23744', color: '#fff' }}>
        <Utensils size={70} />
        <h2 style={{ fontWeight: 900 }}>Khaperkhedaa Court</h2>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900, fontSize: '20px' }}>Khaperkhedaa Court</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Nagpur's Best Food Delivery</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <UserCircle size={28} onClick={() => setIsProfileOpen(true)} color={profile.name ? "#24963F" : "#555"} />
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={28} color="#E23744" />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px' }}>{cart.length}</span>}
          </div>
        </div>
      </header>

      {/* Offer Slider */}
      <div style={{ padding: '15px', backgroundColor: '#fff' }}>
        <div style={{ backgroundColor: offers[currentSlide].bg, height: '120px', borderRadius: '15px', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900 }}>{offers[currentSlide].title}</h3>
          <p style={{ margin: '5px 0', fontSize: '12px' }}>{offers[currentSlide].sub}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 15px', sticky: 'top', top: '65px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', backgroundColor: activeTab === tab ? '#E23744' : '#f0f0f0', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold' }}>
             {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '15px' }}>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px', border: '1px solid #f0f0f0' }}>
            {/* Image with Fallback Icon */}
            <div style={{ width: '120px', height: '120px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img 
                src={item.img} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt={item.name} 
                onError={(e: any) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="color:#E23744"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg></div>';
                }}
              />
            </div>
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{item.name}</h4>
                <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{item.rating} ★</span>
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
                    <button onClick={()=>addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '10px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px' }}>Half ₹{item.half}</button>
                    <button onClick={()=>addToCart(item, 'Full', item.full)} style={{ flex: 1, padding: '10px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px' }}>Full ₹{item.full}</button>
                  </>
                ) : (
                  <button onClick={()=>addToCart(item, 'Add', item.price)} style={{ flex: 1, padding: '10px', background: '#E23744', color: '#fff', border: 'none', borderRadius: '8px' }}>Add ₹{item.price}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px 20px', borderTop: '1px solid #eee', borderRadius: '20px 20px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Total:</span>
            <span style={{ fontWeight: 900, fontSize: '20px' }}>₹{total}</span>
          </div>
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>Order on WhatsApp</button>
        </div>
      )}

      {isProfileOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div style={{ width: '85%', height: '100%', backgroundColor: '#fff', padding: '20px', float: 'right' }}>
            <X onClick={() => setIsProfileOpen(false)} style={{ marginBottom: '20px' }} />
            <h3>Nagpur Profile</h3>
            <input type="text" value={tempProfile.name} onChange={(e)=>setTempProfile({...tempProfile, name: e.target.value})} placeholder="Full Name" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="tel" value={tempProfile.phone} onChange={(e)=>setTempProfile({...tempProfile, phone: e.target.value})} placeholder="10 Digit Phone" maxLength={10} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <textarea value={tempProfile.address} onChange={(e)=>setTempProfile({...tempProfile, address: e.target.value})} placeholder="Nagpur Address" rows={4} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <button onClick={saveProfile} style={{ width: '100%', backgroundColor: '#24963F', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>Save Profile</button>
          </div>
        </div>
      )}
    </div>
  );
            }
