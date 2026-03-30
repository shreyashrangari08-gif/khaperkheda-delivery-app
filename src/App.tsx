import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, MapPin, Phone, MessageCircle, Clock, UserCircle, X, Save } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Biryani');
  const [cart, setCart] = useState<any[]>([]);
  
  // Profile & Address State (Saved in local)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('kdProfile');
    return saved ? JSON.parse(saved) : { name: '', phone: '', address: '' };
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [tempProfile, setTempProfile] = useState(profile);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Offers Slides Data
  const offers = [
    { id: 1, title: "FLAT 50% OFF", sub: "On your first order above ₹299", code: "WELCOME50", bg: "#FF4757" },
    { id: 2, title: "FREE DELIVERY", sub: "Nagpur special offer! Within 5km", code: "NAGPURFREE", bg: "#2ED573" },
    { id: 3, title: "WEEKEND BONANZA", sub: "Buy 1 Get 1 Free on all Pizzas", code: "PIZZABOGO", bg: "#FFA502" },
    { id: 4, title: "BIRYANIFEST", sub: "Extra Raita & Salan with Full Biryani", code: "BIRYANILOVE", bg: "#5352ED" },
    { id: 5, title: "SWEET ENDINGS", sub: "Add Gulab Jamun at just ₹10", code: "SWEET10", bg: "#FF6B81" }
  ];

  // Auto-play slides & Splash screen
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);
    const splashTimer = setTimeout(() => setLoading(false), 2000);
    return () => { clearInterval(slideTimer); clearTimeout(splashTimer); };
  }, []);

  // Save Profile Magic
  const saveProfile = () => {
    localStorage.setItem('kdProfile', JSON.stringify(tempProfile));
    setProfile(tempProfile);
    setIsProfileOpen(false);
    alert("Profile saved successfully!");
  };

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 220, rating: "4.8", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 90, full: 160, rating: "4.2", img: "https://images.unsplash.com/photo-154332658-9273644877ed?w=500" },
      { id: 'b3', name: "Egg Biryani", half: 100, full: 180, rating: "4.4", img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500" },
      { id: 'b4', name: "Mutton Dum Biryani", half: 180, full: 320, rating: "4.9", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.5", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.2", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500" },
      { id: 's3', name: "Idli Sambhar (2 Pc)", price: 60, rating: "4.4", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500" },
      { id: 'p2', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500" },
      { id: 'p3', name: "Chicken Supreme Pizza", s: 250, m: 480, l: 750, rating: "4.8", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=500" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.unsplash.com/photo-1628163901980-dfd35e120150?w=500" },
      { id: 'sw3', name: "Hot Jalebi (250g)", price: 120, rating: "4.6", img: "https://images.unsplash.com/photo-1589113473042-430349cc993a?w=500" }
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
      alert("Please update your profile with Name, Phone, and Address first!");
      setIsProfileOpen(true);
      return;
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsLink = `http://google.com/maps?q=${latitude},${longitude}`;
        const message = `🔥 *New Order from Khaperkhedaa Court*\n\n👤 *Customer:* ${profile.name}\n📞 *Phone:* ${profile.phone}\n📍 *Address:* ${profile.address}\n🗺️ *Location:* ${mapsLink}\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty} - ₹${i.price * i.qty}`).join('\n')}\n\n💰 *Total:* ₹${total}`;
        window.open(`https://wa.me/919699343711?text=${encodeURIComponent(message)}`);
      });
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E23744', color: '#fff' }}>
        <Utensils size={80} style={{ marginBottom: '20px' }} />
        <h1 style={{ fontWeight: 900, fontSize: '32px' }}>Khaperkhedaa Court</h1>
        <p>Loading Nagpur's Best Flavors...</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px', overflowX: 'hidden' }}>
      {/* Header */}
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900, fontSize: '22px' }}>Khaperkhedaa Court</h2>
          <p style={{ margin: 0, fontSize: '11px', color: '#666' }}>Authentic Flavors, Fast Delivery</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setIsProfileOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <UserCircle size={28} color={profile.name ? "#24963F" : "#555"} />
          </button>
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={28} color="#E23744" />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px', fontWeight: 'bold' }}>{cart.length}</span>}
          </div>
        </div>
      </header>

      {/* Zomato Style Offers Slider */}
      <div style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #eee', position: 'relative' }}>
        <div style={{ overflow: 'hidden', borderRadius: '15px', height: '130px', position: 'relative' }}>
          {offers.map((offer, index) => (
            <div key={offer.id} style={{ position: 'absolute', top: 0, left: `${(index - currentSlide) * 100}%`, width: '100%', height: '100%', backgroundColor: offer.bg, color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'left 0.5s ease-in-out', boxSizing: 'border-box' }}>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>{offer.title}</h3>
              <p style={{ margin: '3px 0 8px 0', fontSize: '12px', opacity: 0.9 }}>{offer.sub}</p>
              <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', alignSelf: 'flex-start' }}>Use Code: {offer.code}</span>
            </div>
          ))}
        </div>
        {/* Slider Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          {offers.map((_, index) => (
            <div key={index} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: currentSlide === index ? '#E23744' : '#ddd', transition: '0.3s' }}></div>
          ))}
        </div>
      </div>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #eee', whiteSpace: 'nowrap', sticky: 'top', top: '72px', zIndex: 9 }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', backgroundColor: activeTab === tab ? '#E23744' : '#f0f0f0', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
             {tab === 'Biryani' ? '🍗 ' : tab === 'South' ? '🍛 ' : tab === 'Pizza' ? '🍕 ' : '🍰 '}{tab}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '15px', color: '#1c1c1c' }}>{activeTab} Special</h3>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px', border: '1px solid #f0f0f0' }}>
            <img src={item.img} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt={item.name} />
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1c1c1c' }}>{item.name}</h4>
                <span style={{ backgroundColor: '#24963F', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginTop: '4px' }}>{item.rating} ★</span>
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

      {/* Need Help Section */}
      <div style={{ padding: '0 20px 20px 20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        <p>Need Help? <a href="tel:+919699343711" style={{ color: '#E23744', textDecoration: 'none', fontWeight: 'bold' }}>Call Us</a> or <a href="https://wa.me/919699343711" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a></p>
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px 20px', borderTop: '1px solid #eee', boxSizing: 'border-box', borderRadius: '20px 20px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: '#555' }}>Order Total:</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#1c1c1c' }}>₹{total}</span>
          </div>
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(226, 55, 68, 0.3)' }}>
            Place Order via WhatsApp
          </button>
        </div>
      )}

      {/* Profile / Account Sidebar */}
      {isProfileOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setIsProfileOpen(false)}>
          <div style={{ width: '85%', maxWidth: '350px', height: '100%', backgroundColor: '#fff', padding: '20px', boxSizing: 'border-box', position: 'relative', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsProfileOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="#555" />
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
              <UserCircle size={70} color="#E23744" style={{ marginBottom: '10px' }} />
              <h2 style={{ margin: 0, fontWeight: 800 }}>{profile.name ? "Edit Profile" : "Create Account"}</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Save details for faster checkout</p>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#555', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Full Name *</label>
              <input type="text" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} placeholder="e.g. Rahul Sharma" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px', boxSizing: 'border-box' }} />

              <label style={{ fontSize: '12px', color: '#555', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Phone Number *</label>
              <input type="tel" value={tempProfile.phone} onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})} placeholder="10-digit mobile number" maxLength={10} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px', boxSizing: 'border-box' }} />

              <label style={{ fontSize: '12px', color: '#555', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Delivery Address *</label>
              <textarea value={tempProfile.address} onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})} placeholder="Flat/House No, Building, Area (e.g. Nagpur)" rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px', boxSizing: 'border-box', fontFamily: 'sans-serif' }} />
            </div>

            <button onClick={saveProfile} style={{ width: '100%', backgroundColor: '#24963F', color: '#fff', padding: '15px', borderRadius: '10px', fontWeight: 'bold', border: 'none', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Save size={18} /> Save Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
        }
