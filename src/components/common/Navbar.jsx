import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHeart, FiTrash2, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useWishlist } from '../../context/WishlistContext';
import { useData } from '../../context/DataContext';
import CheckoutModal from '../products/CheckoutModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const { phoneNumber } = useData();
  const { wishlist, removeFromWishlist } = useWishlist();
  const location = useLocation();

  if (location.pathname === '/admin') return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Brands', path: '/brands' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsWishlistOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu or wishlist drawer is open
  useEffect(() => {
    if (isOpen || isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isWishlistOpen]);

  const isHomePage = location.pathname === '/';

  // Dynamic header classes keeping the capsule layout globally
  const headerClasses = `fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[95%] max-w-7xl rounded-2xl border backdrop-blur-md ${
    isScrolled
      ? 'top-2 bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 shadow-lg py-2.5 sm:py-3'
      : isHomePage
        ? 'top-10 sm:top-12 bg-white/60 dark:bg-gray-900/30 border-gray-200/40 dark:border-gray-800/20 py-4 sm:py-5'
        : 'top-10 sm:top-12 bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 shadow-md py-4 sm:py-5'
  }`;

  const containerClasses = "w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center";

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-royal-blue dark:bg-black text-white text-[10px] sm:text-xs py-2 px-4 border-b border-premium-gold/20 flex justify-between items-center z-50 relative font-sans">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <FiClock className="text-premium-gold" />
          <span>Showroom Hours: 10:00 AM - 9:00 PM</span>
        </div>
        <div className="hidden sm:inline-block text-premium-gold font-semibold tracking-wider uppercase animate-pulse">
          ✨ Special Festival Sale: Buy 1 Get 1 Free on all Frames! ✨
        </div>
        <a
          href={`tel:+${phoneNumber}`}
          className="hover:text-premium-gold transition-colors duration-200"
        >
          Call: +{phoneNumber}
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header className={headerClasses}>
        <div className={containerClasses}>
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-royal-blue dark:text-white m-0 transition-colors duration-300">
              OPTIC<span className="text-premium-gold ml-1.5 font-serif font-light">WORLD</span>
            </h1>
            <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.25em] text-secondary-text uppercase -mt-1 group-hover:text-premium-gold transition-colors duration-300">
              See Better. Look Better. Smell Better.
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-premium-gold ${
                    isActive
                      ? 'text-premium-gold font-semibold'
                      : 'text-primary-text dark:text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-premium-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Wishlist Toggle Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full text-primary-text dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative cursor-pointer"
              aria-label="Open Wishlist"
              id="wishlist-toggle"
            >
              <FiHeart className="w-5 h-5 text-red-500 fill-current" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-premium-gold text-royal-blue text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white dark:border-gray-900 shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full text-primary-text dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden glassmorphism flex flex-col justify-center pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-6 text-center my-auto">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-xl font-medium font-serif tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-premium-gold font-bold scale-105' : 'text-primary-text dark:text-white hover:text-premium-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col items-center space-y-4 border-t border-gray-200 dark:border-gray-800 pt-6">
              <span className="text-xs text-secondary-text font-serif italic">
                "See Better. Look Better. Smell Better."
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FiHeart className="text-red-500 fill-current w-5 h-5" />
                  <h2 className="text-lg font-bold tracking-tight dark:text-white">Your Wishlist ({wishlist.length})</h2>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
                  aria-label="Close Wishlist Drawer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <FiHeart className="w-12 h-12 text-gray-300 dark:text-gray-700 animate-pulse" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium font-sans">Your wishlist is empty</p>
                    <p className="text-xs text-secondary-text font-sans">Browse our premium collections and add your favorites!</p>
                    <Link
                      to="/products"
                      className="mt-2 bg-royal-blue text-white px-5 py-2 rounded-md font-sans font-medium hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300 border border-premium-gold/30 text-sm"
                      onClick={() => setIsWishlistOpen(false)}
                    >
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-150 dark:border-gray-800 items-center justify-between"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-800"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-premium-gold font-semibold uppercase tracking-wider block">
                          {item.brand}
                        </span>
                        <h4 className="text-sm font-semibold text-primary-text dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-secondary-text font-serif italic capitalize">
                          {item.category.replace('-', ' ')}
                        </p>
                        <span className="text-sm font-bold text-royal-blue dark:text-premium-gold font-sans block mt-0.5">
                          ₹{item.price}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full cursor-pointer"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setCheckoutProduct(item);
                            setCheckoutProducts([]);
                            setIsCheckoutOpen(true);
                          }}
                          className="bg-[#25D366] text-white p-2 rounded-full hover:scale-105 transition-all text-xs flex items-center justify-center cursor-pointer border border-transparent"
                          title="Checkout Item"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Multi-item Checkout Footer */}
              {wishlist.length > 0 && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 space-y-4">
                  <div className="flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-secondary-text dark:text-gray-400">Total ({wishlist.length} items):</span>
                    <span className="text-royal-blue dark:text-premium-gold text-lg">
                      ₹{wishlist.reduce((acc, p) => acc + Number(p.price), 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutProducts(wishlist);
                      setCheckoutProduct(null);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow transition-all duration-300 border border-transparent"
                  >
                    <FaWhatsapp className="w-4.5 h-4.5" />
                    <span>Checkout All Items via WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
        products={checkoutProducts}
      />
    </>
  );
};

export default Navbar;
