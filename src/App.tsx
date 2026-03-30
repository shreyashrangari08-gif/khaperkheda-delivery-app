import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Utensils, Pizza, IceCream, MapPin, Phone, MessageCircle, Clock, UserCircle, X, Save } from 'lucide-react';

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
    { id: 1, title: "FLAT 50% OFF", sub: "Nagpur Special! On first order", code: "WELCOME50", bg: "#E23744" },
    { id: 2, title: "FREE DELIVERY", sub: "For orders above ₹399 in Khaperkheda", code: "FREEDEL", bg: "#24963F" },
    { id: 3, title: "PIZZA FESTIVAL", sub: "Buy 1 Get 1 on all Large Pizzas", code: "BOGOPIZZA", bg: "#FFA502" }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % offers.length), 4000);
    const splashTimer = setTimeout(() => setLoading(false), 2000);
    return () => { clearInterval(slideTimer); clearTimeout(splashTimer); };
  }, []);

  const saveProfile = () => {
    localStorage.setItem('kdProfile', JSON.stringify(tempProfile));
    setProfile(tempProfile);
    setIsProfileOpen(false);
    alert("Profile saved!");
  };

  const menuData: any = {
    Biryani: [
      { id: 'b1', name: "Chicken Dum Biryani", half: 130, full: 240, rating: "4.8", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400" },
      { id: 'b2', name: "Hyderabadi Veg Biryani", half: 100, full: 180, rating: "4.2", img: "https://images.unsplash.com/photo-154332658-9273644877ed?w=400" },
      { id: 'b3', name: "Special Egg Biryani", half: 110, full: 190, rating: "4.4", img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400" },
      { id: 'b4', name: "Paneer Tikka Biryani", half: 130, full: 230, rating: "4.5", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
      { id: 'b5', name: "Mutton Dum Biryani", half: 190, full: 350, rating: "4.9", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
      { id: 'b6', name: "Nagpur Saoji Biryani", half: 150, full: 260, rating: "4.7", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400" },
      { id: 'b7', name: "Chicken Tikka Biryani", half: 140, full: 250, rating: "4.6", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400" },
      { id: 'b8', name: "Soya Chaap Biryani", half: 100, full: 180, rating: "4.1", img: "https://images.unsplash.com/photo-1645177623570-ad4b5a8050e5?w=400" },
      { id: 'b9', name: "Kashmiri Pulao", half: 110, full: 190, rating: "4.3", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400" },
      { id: 'b10', name: "Tandoori Chicken Biryani", half: 160, full: 280, rating: "4.8", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400" }
    ],
    South: [
      { id: 's1', name: "Butter Masala Dosa", price: 110, rating: "4.5", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
      { id: 's2', name: "Sambhar Vada (2 Pc)", price: 70, rating: "4.2", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
      { id: 's3', name: "Onion Uttapam", price: 95, rating: "4.3", img: "https://images.unsplash.com/photo-1627387115324-75883bb21b05?w=400" },
      { id: 's4', name: "Idli Sambhar (2 Pc)", price: 60, rating: "4.4", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
      { id: 's5', name: "Paneer Masala Dosa", price: 140, rating: "4.6", img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400" },
      { id: 's6', name: "Rava Onion Dosa", price: 120, rating: "4.1", img: "https://images.unsplash.com/photo-1581447100512-67551730245b?w=400" },
      { id: 's7', name: "Cheese Chilli Dosa", price: 150, rating: "4.7", img: "https://images.unsplash.com/photo-1639023477161-0b5c179421f2?w=400" },
      { id: 's8', name: "Mysore Masala Dosa", price: 130, rating: "4.5", img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400" },
      { id: 's9', name: "Medu Vada (Platter)", price: 90, rating: "4.4", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
      { id: 's10', name: "Nagpur Ghee Podi Idli", price: 100, rating: "4.8", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" }
    ],
    Pizza: [
      { id: 'p1', name: "Paneer Tikka Pizza", s: 199, m: 379, l: 599, rating: "4.6", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400" },
      { id: 'p2', name: "Farmhouse Veggie Pizza", s: 179, m: 349, l: 549, rating: "4.3", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400" },
      { id: 'p3', name: "Double Cheese Margherita", s: 189, m: 369, l: 569, rating: "4.5", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400" },
      { id: 'p4', name: "Spicy Chicken Pizza", s: 229, m: 429, l: 649, rating: "4.7", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
      { id: 'p5', name: "Corn & Cheese Pizza", s: 159, m: 299, l: 499, rating: "4.2", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
      { id: 'p6', name: "Mexican Green Wave", s: 210, m: 399, l: 610, rating: "4.4", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
      { id: 'p7', name: "Chicken Supreme Pizza", s: 250, m: 480, l: 750, rating: "4.8", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400" },
      { id: 'p8', name: "7 Cheese Pizza", s: 280, m: 520, l: 850, rating: "4.9", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400" },
      { id: 'p9', name: "Peppy Paneer Special", s: 210, m: 399, l: 600, rating: "4.6", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400" },
      { id: 'p10', name: "Veggie Paradise", s: 190, m: 360, l: 560, rating: "4.5", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400" }
    ],
    Sweets: [
      { id: 'sw1', name: "Gulab Jamun (2 Pc)", price: 50, rating: "4.8", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=400" },
      { id: 'sw2', name: "Rasmalai (2 Pc)", price: 80, rating: "4.9", img: "https://images.unsplash.com/photo-1628163901980-dfd35e120150?w=400" },
      { id: 'sw3', name: "Kaju Katli (250g)", price: 250, rating: "4.7", img: "https://images.unsplash.com/photo-1605663714271-e00b1473266e?w=400" },
      { id: 'sw4', name: "Hot Jalebi (250g)", price: 120, rating: "4.6", img: "https://images.unsplash.com/photo-1589113473042-430349cc993a?w=400" },
      { id: 'sw5', name: "Motichoor Ladoo (4 Pc)", price: 60, rating: "4.5", img: "https://images.unsplash.com/photo-1599839619722-397514118837?w=400" },
      { id: 'sw6', name: "Bengali Rasgulla (2 Pc)", price: 40, rating: "4.3", img: "https://images.unsplash.com/photo-1630132174300-3486119107cc?w=400" },
      { id: 'sw7', name: "Kulfi Falooda Special", price: 110, rating: "4.7", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400" },
      { id: 'sw8', name: "Ice Cream Scoop (Mix)", price: 60, rating: "4.4", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400" },
      { id: 'sw9', name: "Chocolate Brownie", price: 150, rating: "4.6", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400" },
      { id: 'sw10', name: "Milk Cake (250g)", price: 200, rating: "4.8", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=400" }
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
      alert("Please save your Profile details first!");
      setIsProfileOpen(true);
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const mapsLink = `http://googleusercontent.com/maps.google.com/4{pos.coords.latitude},${pos.coords.longitude}`;
      const msg = `🔥 *New Order: Khaperkhedaa Court*\n👤 *Name:* ${profile.name}\n📞 *Phone:* ${profile.phone}\n📍 *Addr:* ${profile.address}\n🗺️ *Location:* ${mapsLink}\n\n*Items:*\n${cart.map(i=>`• ${i.name} (${i.sizeType}) x ${i.qty}`).join('\n')}\n💰 *Total:* ₹${total}`;
      window.open(`https://wa.me/919699343711?text=${encodeURIComponent(msg)}`);
    });
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E23744', color: '#fff' }}>
        <Utensils size={60} />
        <h2 style={{ fontWeight: 900 }}>Khaperkhedaa Court</h2>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '160px' }}>
      <header style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
        <div>
          <h2 style={{ color: '#E23744', margin: 0, fontWeight: 900 }}>Khaperkhedaa Court</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Nagpur's Pride • Fast Delivery</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <UserCircle size={28} onClick={() => setIsProfileOpen(true)} color={profile.name ? "#24963F" : "#555"} />
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={28} color="#E23744" />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E23744', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }}>{cart.length}</span>}
          </div>
        </div>
      </header>

      {/* Offers Slider */}
      <div style={{ padding: '15px', backgroundColor: '#fff' }}>
        <div style={{ height: '120px', backgroundColor: offers[currentSlide].bg, borderRadius: '15px', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: '0.5s' }}>
          <h3 style={{ margin: 0 }}>{offers[currentSlide].title}</h3>
          <p style={{ margin: '5px 0', fontSize: '12px' }}>{offers[currentSlide].sub}</p>
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>Code: {offers[currentSlide].code}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 15px', sticky: 'top', top: '65px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        {['Biryani', 'South', 'Pizza', 'Sweets'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', backgroundColor: activeTab === tab ? '#E23744' : '#f0f0f0', color: activeTab === tab ? '#fff' : '#555', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ marginBottom: '15px' }}>{activeTab} Special</h3>
        {menuData[activeTab].map((item: any) => (
          <div key={item.id} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', marginBottom: '15px' }}>
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

      {/* Cart Button */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', padding: '15px 20px', borderTop: '1px solid #eee', borderRadius: '20px 20px 0 0', boxShadow: '0 -10px 20px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Order Value:</span>
            <span style={{ fontWeight: 900, fontSize: '20px' }}>₹{total}</span>
          </div>
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#E23744', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>Checkout Order</button>
        </div>
      )}

      {/* Profile Sidebar */}
      {isProfileOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div style={{ width: '80%', height: '100%', backgroundColor: '#fff', padding: '20px', float: 'right' }}>
            <X onClick={() => setIsProfileOpen(false)} style={{ marginBottom: '20px' }} />
            <h3>Your Profile</h3>
            <input type="text" value={tempProfile.name} onChange={(e)=>setTempProfile({...tempProfile, name: e.target.value})} placeholder="Full Name" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="tel" value={tempProfile.phone} onChange={(e)=>setTempProfile({...tempProfile, phone: e.target.value})} placeholder="Phone" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <textarea value={tempProfile.address} onChange={(e)=>setTempProfile({...tempProfile, address: e.target.value})} placeholder="Address" rows={4} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <button onClick={saveProfile} style={{ width: '100%', backgroundColor: '#24963F', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>Save Profile</button>
          </div>
        </div>
      )}
    </div>
  );
      }
