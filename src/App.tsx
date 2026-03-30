import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, MapPin, Phone, MessageCircle, Clock, UserCircle, X, Save, Tag } from 'lucide-react';

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
    { id: 1, title: "FLAT 50% OFF", sub: "On first Nagpur order!", code: "WELCOME50", bg: "#E23744" },
    { id: 2, title: "FREE DELIVERY", sub: "For orders above ₹399 in Nagpur", code: "FREEDEL", bg: "#24963F" },
    { id: 3, title: "PIZZA FEST", sub: "Buy 1 Get 1 on all Large Pizzas", code: "BOGOPIZZA", bg: "#FFA502" }
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
    alert("Profile saved successfully!");
  };

  // Tested Working High Quality Images
  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 240, rating: "4.8", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 100, full: 180, rating: "4.2", img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b3', name: "Egg Dum Biryani", half: 110, full: 190, rating: "4.4", img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b4', name: "Paneer Tikka Biryani", half: 130, full: 230, rating: "4.5", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b5', name: "Mutton Dum Biryani", half: 190, full: 350, rating: "4.9", img: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b6', name: "Chicken Tikka Biryani", half: 140, full: 250, rating: "4.6", img: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b7', name: "Saoji Chicken Biryani", half: 150, full: 260, rating: "4.7", img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'b8', name: "Tandoori Biryani Special", half: 160, full: 280, rating: "4.8", img: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    South: [
      { id: 's1', name: "Masala Dosa (Butter)", price: 110, rating: "4.5", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's2', name: "Idli Sambhar (3 Pc)", price: 70, rating: "4.4", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's3', name: "Onion Uttapam", price: 95, rating: "4.3", img: "https://images.pexels.com/photos/13063293/pexels-photo-13063293.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's4', name: "Paneer Masala Dosa", price: 140, rating: "4.6", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's5', name: "Rava Onion Dosa", price: 120, rating: "4.1", img: "https://images.pexels.com/photos/13063293/pexels-photo-13063293.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's6', name: "Mysore Masala Dosa", price: 130, rating: "4.5", img: "https://images.pexels.com/photos/5560700/pexels-photo-5560700.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's7', name: "Vada Sambhar Platter", price: 90, rating: "4.4", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 's8', name: "Nagpur Podi Idli", price: 100, rating: "4.8", img: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p3', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p4', name: "Spicy Chicken Pizza", s: 229, m: 429, l: 649, rating: "4.7", img: "https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p5', name: "Chicken Supreme Pizza", s: 250, m: 480, l: 750, rating: "4.8", img: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p6', name: "Mex Wave Special", s: 210, m: 399, l: 610, rating: "4.4", img: "https://images.pexels.com/photos/8471701/pexels-photo-8471701.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p7', name: "Veggie Paradise", s: 190, m: 360, l: 560, rating: "4.5", img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'p8', name: "Peppy Paneer Delight", s: 210, m: 399, l: 600, rating: "4.6", img: "https://images.pexels.com/photos/9646850/pexels-photo-9646850.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw2', name: "Rasmalai Special (2 Pc)", price: 80, rating: "4.9", img: "https://images.pexels.com/photos/10313176/pexels-photo-10313176.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://images.pexels.com/photos/10313178/pexels-photo-10313178.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw4', name: "Motichoor Ladoo (4 Pc)", price: 60, rating: "4.5", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw5', name: "Chocolate Brownie", price: 150, rating: "4.6", img: "https://images.pexels.com/photos/10313176/pexels-photo-10313176.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw6', name: "Bengali Rasgulla (2 Pc)", price: 40, rating: "4.3", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw7', name: "Vanilla Ice Cream", price: 60, rating: "4.4", img: "https://images.pexels.com/photos/10313178/pexels-photo-10313178.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 'sw8', name: "Milk Cake Special (250g)", price: 200, rating: "4.8", img: "https://images.pexels.com/photos/12330751/pexels-photo-12330751.jpeg?auto=compress&cs=tinysrgb&w=600" }
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
    if (!profile.name || !profile.phone || !profile.address) {
      alert("Please update your profile details first!");
      setIsProfileOpen(true);
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const mapsLink = `http://googleusercontent.com/maps.google.com/5?q=${latitude},${longitude}`;
      const message = `🔥 *New Order: Khaperkhedaa Court*\n👤 *Customer:* ${profile.name}\n📞 *Phone:* ${profile.phone}\n📍 *Addr:* ${profile.address}\n🗺️ *Location:* ${mapsLink}\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty}`).join('\n')}\n\n💰 *Total:* ₹${total}`;
      window.open(`https://wa.me/919699343711?text=${encodeURIComponent(message)}`);
    });
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E23744', color: '#fff' }}>
        <Utensils size={70} />
        <h2 style={{ fontWeight: 900, fontSize: '24px' }}>Khaperkhedaa Court</h2>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px', overflowX: 'hidden' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900, fontSize: '20px' }}>Khaperkhedaa Court</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Nagpur's Taste, Khaperkheda's Delivery</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <UserCircle size={28} onClick={() => setIsProfileOpen(true)} color={profile.name ? "#24963F" : "#555"} />
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={28} color="#E23744" />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px', fontWeight: 'bold' }}>{cart.length}</span>}
          </div>
        </div>
      </header>

      {/* Offers Slider (Nagpur Special) */}
      <div style={{ padding: '15px', backgroundColor: '#fff', position: 'relative' }}>
        <div style={{ backgroundColor: offers[currentSlide].bg, height: '120px', borderRadius: '15px', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: '0.5s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} /><h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900 }}>{offers[currentSlide].title}</h3></div>
          <p style={{ margin: '5px 0 8px 0', fontSize: '12px' }}>{offers[currentSlide].sub}</p>
          <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px' }}>CODE: {offers[currentSlide].code}</span>
        </div>
      </div>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 15px', sticky: 'top', top: '65px', backgroundColor: '#fff', borderBottom: '1px solid #eee', whiteSpace: 'nowrap', zIndex: 9 }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', backgroundColor: activeTab === tab ? '#E23744' : '#f0f0f0', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold', fontSize: '13px' }}>
             {tab === 'Biryani' ? '🍗 ' : tab === 'South' ? '🍛 ' : tab === 'Pizza' ? '🍕 ' : '🍰 '}{tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '15px' }}>{activeTab} Special Menu</h3>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px', border: '1px solid #f0f0f0' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{item.name}</h4>
                <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{item.rating} ★</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {activeTab === 'Pizza' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'S', item.s)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '10px', fontWeight: 'bold', backgroundColor: 'transparent' }}>S ₹{item.s}</button>
                    <button onClick={()=>addToCart(item, 'M', item.m)} style={{ flex: 1, padding: '8px 2px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '10px', fontWeight: 'bold', backgroundColor: 'transparent' }}>M ₹{item.m}</button>
                    <button onClick={()=>addToCart(item, 'L', item.l)} style={{ flex: 1, padding: '8px 2px', background: '#E23744', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>L ₹{item.l}</button>
                  </>
                ) : activeTab === 'Biryani' ? (
                  <>
                    <button onClick={()=>addToCart(item, 'Half', item.half)} style={{ flex: 1, padding: '10px', border: '1px solid #E23744', borderRadius: '8px', color: '#E23744', fontSize: '11px', fontWeight: 'bold', backgroundColor: 'transparent' }}>Half ₹{item.half}</button>
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

      <div style={{ padding: '20px', textAlign: 'center', fontSize: '11px', color: '#888' }}>
        <p>Delivery only in Khaperkheda and nearby Nagpur regions. <br/> <a href="tel:+919699343711" style={{ color: '#E23744', textDecoration: 'none' }}>Call Help</a></p>
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px 20px', borderTop: '1px solid #eee', boxSizing: 'border-box', borderRadius: '20px 20px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: '#555' }}>Total:</span>
            <span style={{ fontWeight: 900, fontSize: '20px' }}>₹{total}</span>
          </div>
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(226, 55, 68, 0.3)' }}>Place Order (WhatsApp)</button>
        </div>
      )}

      {/* Profile Sidebar */}
      {isProfileOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div style={{ width: '85%', maxWidth: '350px', height: '100%', backgroundColor: '#fff', padding: '20px', float: 'right' }}>
            <X onClick={() => setIsProfileOpen(false)} style={{ marginBottom: '20px', cursor: 'pointer' }} />
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Setup Profile (Nagpur)</h3>
            <input type="text" value={tempProfile.name} onChange={(e)=>setTempProfile({...tempProfile, name: e.target.value})} placeholder="Full Name" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="tel" value={tempProfile.phone} onChange={(e)=>setTempProfile({...tempProfile, phone: e.target.value})} placeholder="Nagpur Mobile (10 digit)" maxLength={10} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <textarea value={tempProfile.address} onChange={(e)=>setTempProfile({...tempProfile, address: e.target.value})} placeholder="Flat/House No, Area, Khaperkheda/Nagpur" rows={4} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'sans-serif' }} />
            <button onClick={saveProfile} style={{ width: '100%', backgroundColor: '#24963F', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Save Profile Details</button>
          </div>
        </div>
      )}
    </div>
  );
                                                     }
