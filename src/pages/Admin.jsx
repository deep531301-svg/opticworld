import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { 
  FiPlus, FiTrash2, FiEdit2, FiCheck, FiTag, FiPhone, FiPieChart, 
  FiShoppingBag, FiActivity, FiLock, FiUnlock, FiDownload, FiUpload, 
  FiArrowRight, FiCheckCircle, FiInfo, FiLayers, FiSettings, FiMail, FiEye, FiEyeOff 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ThemeToggle from '../components/common/ThemeToggle';

const Admin = () => {
  const {
    products,
    offers,
    phoneNumber,
    ordersCount,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    deleteCoupon,
    updatePhoneNumber,
  } = useData();

  // Authentication Supabase states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if user session already exists in Supabase
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'deep531301@gmail.com').toLowerCase();
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user?.email?.toLowerCase() === adminEmail) {
          setIsAuthenticated(true);
        } else if (session) {
          await supabase.auth.signOut(); // Sign out any unauthorized email
        }
      } catch (e) {
        console.error('Session retrieval failed:', e);
      }
    };
    checkSession();
  }, []);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Product Form states
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'optical',
    subcategory: '',
    price: '',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600',
    description: '',
  });

  // Coupon Form states
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    title: '',
    description: '',
    badge: '15% OFF',
    expiry: 'Dec 31, 2026',
  });

  // Settings states
  const [phoneInput, setPhoneInput] = useState(phoneNumber);

  // Edit states for products
  const [editingProdId, setEditingProdId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');

  // Backup file uploader ref
  const fileInputRef = React.useRef(null);

  // Mock activity logs
  const [activities, setActivities] = useState([
    { time: '12:44 PM', desc: 'Bespoke compounding formula compiled in scent bar.', tag: 'Fragrance' },
    { time: '11:15 AM', desc: 'Customer registered for digital VIP Privilege Card.', tag: 'VIP Club' },
    { time: '10:30 AM', desc: 'WhatsApp order leads compiled for Ray-Ban Classic.', tag: 'Eyewear' },
    { time: '09:15 AM', desc: 'Festival coupon code OPTICVIP applied by visitor.', tag: 'Promo' },
  ]);

  // Handle Supabase Email/Password login
  const handleLogin = async (e) => {
    e?.preventDefault();
    setAuthError(false);
    setErrorMessage('');
    const trimmedEmail = email.trim().toLowerCase();
    
    const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'deep531301@gmail.com').toLowerCase();
    
    // STRICT OWNER CHECK: Enforce that only the configured admin email is allowed
    if (trimmedEmail !== adminEmail) {
      setAuthError(true);
      setErrorMessage('Invalid email or password');
      setPassword('');
      setTimeout(() => setAuthError(false), 500);
      return;
    }

    // Direct Supabase authentication call

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: password
      });

      if (error) {
        setAuthError(true);
        setErrorMessage(error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message);
        setPassword('');
        setTimeout(() => setAuthError(false), 500);
      } else {
        // Double check returned user email matches owner
        if (data?.user?.email?.toLowerCase() !== adminEmail) {
          await supabase.auth.signOut();
          setAuthError(true);
          setErrorMessage('Invalid email or password');
          setPassword('');
          setTimeout(() => setAuthError(false), 500);
        } else {
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      setAuthError(true);
      setErrorMessage('Invalid email or password');
      setPassword('');
      setTimeout(() => setAuthError(false), 500);
    }
  };

  // Sign out user session
  const handleSignOut = async () => {
    try {
      const isPlaceholder = !supabase.auth || !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project-id');
      if (!isPlaceholder) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error('Supabase signout error:', e);
    }
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.brand || !newProd.price) {
      alert('Please fill in required fields.');
      return;
    }
    addProduct({
      ...newProd,
      price: Number(newProd.price),
      rating: Number(newProd.rating),
    });
    
    // Add to activity logs
    setActivities([
      { time: 'Just Now', desc: `New product added: ${newProd.name} (${newProd.brand})`, tag: 'Catalog' },
      ...activities
    ]);

    setNewProd({
      name: '',
      brand: '',
      category: 'optical',
      subcategory: '',
      price: '',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600',
      description: '',
    });
    alert('Product added successfully!');
  };

  // Add new coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.title) {
      alert('Please fill in required fields.');
      return;
    }
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase(),
    });

    setActivities([
      { time: 'Just Now', desc: `New coupon code activated: ${newCoupon.code.toUpperCase()}`, tag: 'Promo' },
      ...activities
    ]);

    setNewCoupon({
      code: '',
      title: '',
      description: '',
      badge: '15% OFF',
      expiry: 'Dec 31, 2026',
    });
    alert('Coupon code activated!');
  };

  // Update WhatsApp Business Number
  const handleSavePhone = (e) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    updatePhoneNumber(phoneInput);
    
    setActivities([
      { time: 'Just Now', desc: `WhatsApp primary business hotline updated to +${phoneInput}`, tag: 'Hotline' },
      ...activities
    ]);
    
    alert('WhatsApp business number updated successfully!');
  };

  // Inline Product Editing
  const startEditProduct = (p) => {
    setEditingProdId(p.id);
    setEditPrice(p.price);
    setEditName(p.name);
  };

  const handleSaveEditProduct = (id) => {
    updateProduct(id, {
      price: Number(editPrice),
      name: editName,
    });
    
    setActivities([
      { time: 'Just Now', desc: `Updated details for product ID: ${id}`, tag: 'Catalog' },
      ...activities
    ]);

    setEditingProdId(null);
  };

  // EXPORT / BACKUP JSON DATA
  const handleBackupExport = () => {
    const backupData = {
      products: localStorage.getItem('optic_products') ? JSON.parse(localStorage.getItem('optic_products')) : [],
      offers: localStorage.getItem('optic_offers') ? JSON.parse(localStorage.getItem('optic_offers')) : [],
      phone: phoneNumber,
      ordersCount: ordersCount
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'optic_world_catalog_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // IMPORT / RESTORE JSON DATA
  const handleBackupImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.products) {
          localStorage.setItem('optic_products', JSON.stringify(parsed.products));
        }
        if (parsed.offers) {
          localStorage.setItem('optic_offers', JSON.stringify(parsed.offers));
        }
        if (parsed.phone) {
          localStorage.setItem('optic_phone', parsed.phone);
        }
        if (parsed.ordersCount) {
          localStorage.setItem('optic_orders_count', String(parsed.ordersCount));
        }
        
        alert('Database restored successfully! Reloading portal to apply changes.');
        window.location.reload();
      } catch (err) {
        alert('Failed to parse backup file. Please make sure the JSON structure is valid.');
      }
    };
    fileReader.readAsText(file);
  };

  const categoryShare = {
    optical: products.filter(p => p.category === 'optical').length,
    sunglasses: products.filter(p => p.category === 'sunglasses').length,
    perfumes: products.filter(p => p.category === 'perfumes').length,
  };

  const breadcrumbItems = [{ label: 'Admin Portal', path: '/admin' }];

  // -------------------- AUTHENTICATION LOGIN SCREEN --------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#090d16] text-gray-900 dark:text-white flex flex-col justify-center items-center px-4 font-sans relative overflow-hidden">
        {/* Background glow animations */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-premium-gold/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-royal-blue/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-premium-gold/25 p-8 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-2xl relative z-10"
        >
          <div className="w-14 h-14 bg-premium-gold/10 text-premium-gold rounded-full flex items-center justify-center border border-premium-gold/30 mx-auto font-sans">
            <FiLock className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <span className="text-premium-gold text-[9px] font-bold uppercase tracking-widest block">Showroom Portal</span>
            <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white m-0">Admin Unlock</h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
              Sign in with your email and password to access the storefront dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black text-gray-550 dark:text-gray-400 tracking-wider block">
                Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-455 dark:text-gray-500">
                  <FiMail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-gray-50 dark:bg-black/40 border rounded-xl text-xs focus:outline-none focus:border-premium-gold text-gray-900 dark:text-white font-sans ${
                    authError ? 'border-red-500 animate-shake' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black text-gray-550 dark:text-gray-400 tracking-wider block">
                Password *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-455 dark:text-gray-500">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-9 pr-10 py-2.5 bg-gray-50 dark:bg-black/40 border rounded-xl text-xs focus:outline-none focus:border-premium-gold text-gray-900 dark:text-white font-sans ${
                    authError ? 'border-red-500 animate-shake' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-405 hover:text-premium-gold transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-[10px] text-red-500 font-sans font-semibold text-center mt-2">❌ {errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-premium-gold hover:bg-royal-blue text-royal-blue hover:text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md mt-4 border border-transparent"
            >
              Access Dashboard
            </button>
          </form>

          {/* Secured Login Protection */}
        </motion.div>
      </div>
    );
  }

  // -------------------- MAIN ADMIN PORTAL DASHBOARD --------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070a13] text-gray-900 dark:text-gray-100 font-sans relative overflow-hidden pb-16 pt-24">
      {/* Background glow design */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-premium-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Helmet>
          <title>Store Management & Admin Panel | Optic World</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-1">
            <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase block">
              Boutique Workspace
            </span>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white font-serif tracking-tight m-0 flex items-center space-x-2">
              <span>Admin Control Center</span>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded text-[9px] font-mono tracking-normal uppercase">Secure Online</span>
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle className="bg-white border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-royal-blue dark:text-premium-gold shadow-sm" />

            <button
              onClick={handleBackupExport}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm hover:text-premium-gold"
              title="Download database copy"
            >
              <FiDownload className="w-3.5 h-3.5 text-premium-gold" />
              <span>Backup Catalog</span>
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm hover:text-premium-gold"
              title="Upload database backup"
            >
              <FiUpload className="w-3.5 h-3.5 text-premium-gold" />
              <span>Restore Data</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleBackupImport}
              accept=".json"
              className="hidden"
            />

             <Link
               to="/"
               className="bg-royal-blue hover:bg-premium-gold text-white hover:text-royal-blue font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow border border-premium-gold/10"
             >
               <span>View Website</span>
             </Link>

             <button
               onClick={handleSignOut}
               className="bg-red-500/10 hover:bg-red-600 border border-red-500/20 text-red-500 hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
               title="Sign out of Admin Session"
             >
               <FiUnlock className="w-3.5 h-3.5" />
               <span>Sign Out</span>
             </button>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-1.5 rounded-2xl gap-1.5 max-w-md shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: <FiPieChart className="w-4 h-4" /> },
            { id: 'products', label: 'Products', icon: <FiLayers className="w-4 h-4" /> },
            { id: 'coupons', label: 'Coupons', icon: <FiTag className="w-4 h-4" /> },
            { id: 'settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-royal-blue text-white shadow-lg'
                  : 'text-gray-500 dark:text-gray-400 hover:text-royal-blue dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* -------------------- TAB 1: OVERVIEW & ANALYTICS -------------------- */}
        {activeTab === 'overview' &&
          <div className="space-y-8">
            {/* Stat Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl relative overflow-hidden flex items-center space-x-4 shadow-sm">
                <div className="p-3.5 bg-royal-blue/5 dark:bg-royal-blue/10 text-royal-blue dark:text-premium-gold rounded-xl border border-royal-blue/10 dark:border-premium-gold/20 shrink-0">
                  <FiActivity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black block">Active Leads</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{ordersCount}</span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block font-semibold mt-0.5 animate-pulse">● WhatsApp Triggers</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl relative overflow-hidden flex items-center space-x-4 shadow-sm">
                <div className="p-3.5 bg-royal-blue/5 dark:bg-royal-blue/10 text-royal-blue dark:text-premium-gold rounded-xl border border-royal-blue/10 dark:border-premium-gold/20 shrink-0">
                  <FiLayers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black block">Products Count</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{products.length}</span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-450 block font-semibold mt-0.5">Sourced Items</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl relative overflow-hidden flex items-center space-x-4 shadow-sm">
                <div className="p-3.5 bg-royal-blue/5 dark:bg-royal-blue/10 text-royal-blue dark:text-premium-gold rounded-xl border border-royal-blue/10 dark:border-premium-gold/20 shrink-0">
                  <FiTag className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black block">Coupons active</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{offers.length}</span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-450 block font-semibold mt-0.5">Valid Promotions</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl relative overflow-hidden flex items-center space-x-4 shadow-sm">
                <div className="p-3.5 bg-royal-blue/5 dark:bg-royal-blue/10 text-royal-blue dark:text-premium-gold rounded-xl border border-royal-blue/10 dark:border-premium-gold/20 shrink-0">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black block">Sales Hotline</span>
                  <span className="text-base font-black text-gray-900 dark:text-white font-mono block tracking-tight break-all">{phoneNumber}</span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block font-semibold mt-0.5">Dispatch Target</span>
                </div>
              </div>
            </div>

            {/* Performance Analytics & Activity Log */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Analytics SVG Graph */}
              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl lg:col-span-2 space-y-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0">Store Traffic & Clicks</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-sans">Leads compiled by the checkout system weekly.</p>
                  </div>
                  <div className="flex space-x-3 text-[10px] font-sans font-bold">
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#1d4ed8]"></span><span className="text-gray-600 dark:text-gray-400">Optics</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#d97706]"></span><span className="text-gray-600 dark:text-gray-400">Scent Bar</span></span>
                  </div>
                </div>

                <div className="w-full h-72 flex flex-col justify-between pt-2">
                  <div className="w-full flex-1 relative">
                    <svg className="w-full h-full text-royal-blue" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="opticsGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="scentGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d97706" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <line x1="2" y1="10" x2="98" y2="10" stroke="currentColor" strokeDasharray="1.5 1.5" className="text-gray-200 dark:text-gray-800" strokeWidth="0.15" />
                      <line x1="2" y1="20" x2="98" y2="20" stroke="currentColor" strokeDasharray="1.5 1.5" className="text-gray-200 dark:text-gray-800" strokeWidth="0.15" />
                      <line x1="2" y1="30" x2="98" y2="30" stroke="currentColor" strokeDasharray="1.5 1.5" className="text-gray-200 dark:text-gray-800" strokeWidth="0.15" />

                      <path d="M 5 25 C 15 15, 25 18, 35 18 C 45 18, 55 22, 65 10 C 75 2, 85 14, 95 16 L 95 38 L 5 38 Z" fill="url(#opticsGlow)" />
                      <path d="M 5 30 C 15 20, 25 24, 35 24 C 45 24, 55 18, 65 14 C 75 10, 85 28, 95 28 L 95 38 L 5 38 Z" fill="url(#scentGlow)" />

                      <path
                        d="M 5 30 C 15 20, 25 24, 35 24 C 45 24, 55 18, 65 14 C 75 10, 85 28, 95 28"
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0px 1px 3px rgba(217,119,6,0.2))' }}
                      />
                      <path
                        d="M 5 25 C 15 15, 25 18, 35 18 C 45 18, 55 22, 65 10 C 75 2, 85 14, 95 16"
                        fill="none"
                        stroke="#1d4ed8"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0px 2px 5px rgba(29,78,216,0.35))' }}
                      />

                      <circle cx="5" cy="25" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="20" cy="17" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="35" cy="18" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="50" cy="19" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="65" cy="10" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="80" cy="13" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="95" cy="16" r="0.8" fill="#1d4ed8" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />

                      <circle cx="5" cy="30" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="20" cy="21" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="35" cy="24" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="50" cy="20" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="65" cy="14" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="80" cy="23" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                      <circle cx="95" cy="28" r="0.8" fill="#d97706" stroke="#ffffff" className="dark:stroke-gray-900" strokeWidth="0.25" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 pt-3 font-mono px-[4%] border-t border-gray-100 dark:border-gray-800/80">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Logs */}
              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl lg:col-span-1 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0">Recent Activity</h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-sans">Operations logs inside the store portal.</p>
                </div>

                <div className="space-y-4">
                  {activities.map((act, index) => (
                    <div key={index} className="flex items-start space-x-3 text-xs">
                      <div className="bg-gray-100 dark:bg-gray-850 p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[8px] font-mono tracking-tight shrink-0 font-bold uppercase text-royal-blue dark:text-premium-gold">
                        {act.time}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed m-0 text-xs font-semibold">{act.desc}</p>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono tracking-wider font-semibold block">{act.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }

        {/* -------------------- TAB 2: MANAGE PRODUCTS -------------------- */}
        {activeTab === 'products' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Add Product Form */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl space-y-5 lg:col-span-1 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0 flex items-center space-x-2">
                <FiPlus className="text-premium-gold" />
                <span>Add Product</span>
              </h3>

              <form onSubmit={handleAddProduct} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Classic Acetate Square"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ray-Ban"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Category *</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                    >
                      <option value="optical">Optical Glasses</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="perfumes">Perfumes & Attars</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-505 dark:text-gray-400 block">Subcategory</label>
                    <input
                      type="text"
                      placeholder="e.g. aviator / round"
                      value={newProd.subcategory}
                      onChange={(e) => setNewProd({ ...newProd, subcategory: e.target.value })}
                      className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 9500"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-505 dark:text-gray-400 block">Rating (1-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={newProd.rating}
                      onChange={(e) => setNewProd({ ...newProd, rating: e.target.value })}
                      className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Image URL</label>
                  <input
                    type="text"
                    placeholder="Paste Unsplash image address..."
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Description</label>
                  <textarea
                    rows="2"
                    placeholder="Describe lens fitment, frame specs or perfume notes..."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-royal-blue hover:bg-premium-gold text-white hover:text-royal-blue py-3 rounded-xl text-xs font-bold transition-all shadow cursor-pointer uppercase tracking-wider"
                >
                  Save Product
                </button>
              </form>
            </div>

            {/* Manage Catalog List */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl space-y-4 lg:col-span-2 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0">
                Catalog Inventory ({products.length} Products)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px] pb-3">
                      <th className="pb-3 pl-2">Product Details</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3 text-right">Price (INR)</th>
                      <th className="pb-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {products.map((p) => {
                      const isEditing = editingProdId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-950/20">
                          <td className="py-4 pl-2 flex items-center space-x-3 min-w-[220px]">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-11 object-cover rounded-lg border border-gray-200 dark:border-gray-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[9px] text-premium-gold font-bold uppercase tracking-wide leading-none">{p.brand}</span>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="w-full bg-white border border-gray-300 dark:bg-black/60 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-900 dark:text-white mt-1"
                                />
                              ) : (
                                <h4 className="font-bold text-gray-900 dark:text-gray-200 truncate m-0 leading-tight mt-0.5">{p.name}</h4>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="bg-royal-blue/5 dark:bg-royal-blue/15 text-royal-blue dark:text-premium-gold border border-royal-blue/15 dark:border-premium-gold/25 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-4 text-right font-bold text-gray-900 dark:text-white">
                            {isEditing ? (
                              <div className="flex justify-end items-center space-x-1">
                                <span className="text-gray-400">₹</span>
                                <input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-20 bg-white border border-gray-300 dark:bg-black/60 dark:border-gray-700 rounded px-2 py-1 text-right text-xs text-gray-900 dark:text-white"
                                />
                              </div>
                            ) : (
                              `₹${p.price}`
                            )}
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {isEditing ? (
                                <button
                                  onClick={() => handleSaveEditProduct(p.id)}
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-lg cursor-pointer"
                                  title="Save changes"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => startEditProduct(p)}
                                  className="p-1.5 text-gray-400 hover:text-royal-blue dark:hover:text-premium-gold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                                  title="Edit product"
                                >
                                  <FiEdit2 className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                                title="Delete product"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        {/* -------------------- TAB 3: MANAGE COUPONS -------------------- */}
        {activeTab === 'coupons' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Add Coupon Form */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl space-y-5 lg:col-span-1 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0 flex items-center space-x-2">
                <FiPlus className="text-premium-gold" />
                <span>Create Coupon</span>
              </h3>

              <form onSubmit={handleAddCoupon} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EXTRA20"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold font-mono uppercase tracking-wider"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20% Off Holiday Coupon"
                    value={newCoupon.title}
                    onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-505 dark:text-gray-400 block">Badge tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 20% OFF / BOGO"
                    value={newCoupon.badge}
                    onChange={(e) => setNewCoupon({ ...newCoupon, badge: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-505 dark:text-gray-400 block">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 31, 2026"
                    value={newCoupon.expiry}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 block">Description (Scope)</label>
                  <textarea
                    rows="2"
                    placeholder="Applicable on all frames..."
                    value={newCoupon.description}
                    onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-royal-blue hover:bg-premium-gold text-white hover:text-royal-blue py-3 rounded-xl text-xs font-bold transition-all shadow cursor-pointer uppercase tracking-wider"
                >
                  Activate Coupon
                </button>
              </form>
            </div>

            {/* Manage Coupons List */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl space-y-4 lg:col-span-2 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0">
                Active Promo Codes ({offers.length} Vouchers)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offers.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white dark:bg-black/30 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl flex justify-between items-center space-x-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs tracking-wider text-royal-blue dark:text-premium-gold bg-royal-blue/5 dark:bg-premium-gold/5 px-2 py-0.5 rounded border border-royal-blue/10 dark:border-premium-gold/20">
                          {o.code}
                        </span>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">{o.badge}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-200 text-xs truncate m-0 pt-1">{o.title}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-450 truncate leading-snug m-0">{o.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Remove code ${o.code}?`)) deleteCoupon(o.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-950/20 rounded-full cursor-pointer shrink-0 transition-colors"
                      title="Remove coupon"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {/* -------------------- TAB 4: SYSTEM SETTINGS -------------------- */}
        {activeTab === 'settings' &&
          <div className="max-w-xl bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-6 text-left">
            <div>
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white m-0 flex items-center space-x-2">
                <FiPhone className="text-premium-gold" />
                <span>Showroom Contact Settings</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Updating the active WhatsApp phone number here changes the purchase link targets globally across product lists, cart checkouts, and custom fragrance compound exports instantly.
              </p>
            </div>

            <form onSubmit={handleSavePhone} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 tracking-wider block">
                  Primary Business Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 917880009292"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-premium-gold font-mono"
                />
                <span className="text-[9px] text-gray-500 block leading-relaxed mt-1">
                  Enter numbers only, starting with the country code (no '+' or spaces). For India, prepend **`91`** (e.g. `917880009292`).
                </span>
              </div>

              <button
                type="submit"
                className="bg-royal-blue hover:bg-premium-gold text-white hover:text-royal-blue font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all uppercase tracking-wider cursor-pointer border border-transparent"
              >
                Update Phone Number
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default Admin;
