import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiYoutube, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useData } from '../../context/DataContext';

const Footer = () => {
  const location = useLocation();
  const { phoneNumber } = useData();
  const [isOpenNow, setIsOpenNow] = useState(false);

  if (location.pathname === '/admin') return null;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Showroom hours: 10:00 AM to 9:00 PM (10:00 to 21:00)
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // Showroom opens at 10 and closes at 21
      if (hours >= 10 && hours < 21) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#111827] text-gray-300 border-t-2 border-premium-gold/30 pt-16 pb-24 sm:pb-12 font-sans relative overflow-hidden">
      {/* Decorative Golden Ambient Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-premium-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info & Status */}
          <div className="space-y-4">
            <Link to="/" className="flex flex-col items-start group">
              <h2 className="text-2xl font-bold tracking-tight text-white m-0">
                OPTIC<span className="text-premium-gold ml-1.5 font-serif font-light">WORLD</span>
              </h2>
              <span className="text-[8px] font-sans tracking-[0.25em] text-gray-500 uppercase -mt-1 group-hover:text-premium-gold transition-colors duration-300">
                See Better. Look Better. Smell Better.
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Optic World is a luxury optical and fragrance retail showroom. Providing professional optical consulting paired with premium French colognes and imported Arabian Attars.
            </p>
            {/* Live Showroom Open Indicator */}
            <div className="flex items-center space-x-2 pt-2">
              <span className={`relative flex h-3.5 w-3.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpenNow ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOpenNow ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider font-sans">
                {isOpenNow ? (
                  <span className="text-emerald-400">Showroom Open Now</span>
                ) : (
                  <span className="text-red-400">Showroom Closed</span>
                )}
              </span>
            </div>
          </div>

          {/* Site Map Links */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold tracking-wider text-lg border-b border-premium-gold/20 pb-2">Quick Navigation</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><Link to="/" className="hover:text-premium-gold transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-premium-gold transition-colors duration-200">About Us</Link></li>
              <li><Link to="/products" className="hover:text-premium-gold transition-colors duration-200">Products</Link></li>
              <li><Link to="/brands" className="hover:text-premium-gold transition-colors duration-200">Brands</Link></li>
              <li><Link to="/services" className="hover:text-premium-gold transition-colors duration-200">Services</Link></li>
              <li><Link to="/gallery" className="hover:text-premium-gold transition-colors duration-200">Gallery</Link></li>
              <li><Link to="/offers" className="hover:text-premium-gold transition-colors duration-200">Offers</Link></li>
              <li><Link to="/contact" className="hover:text-premium-gold transition-colors duration-200">Contact</Link></li>
              <li><Link to="/admin" className="text-premium-gold/80 hover:text-premium-gold transition-colors duration-200 font-semibold">★ Staff Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold tracking-wider text-lg border-b border-premium-gold/20 pb-2">Visit Showroom</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Plot 45, Luxury Arcade, Ferozepur Road,<br />
                  Opposite Westend Mall, Ludhiana 141012
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-premium-gold w-4 h-4 shrink-0" />
                <a href={`tel:+${phoneNumber}`} className="text-gray-400 hover:text-premium-gold transition-colors font-semibold">
                  +{phoneNumber}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-premium-gold w-4 h-4 shrink-0" />
                <a href="mailto:info@opticworld.com" className="text-gray-400 hover:text-premium-gold transition-colors">
                  info@opticworld.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter signup & Socials */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold tracking-wider text-lg border-b border-premium-gold/20 pb-2">Newsletter</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Subscribe to receive exclusive festival coupons, luxury catalog launches, and vision tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-premium-gold flex-1"
              />
              <button
                type="submit"
                className="bg-premium-gold text-royal-blue font-bold px-4 py-2 rounded hover:bg-white hover:text-royal-blue transition-colors flex items-center justify-center cursor-pointer"
                id="newsletter-subscribe-button"
              >
                {subscribed ? 'Joined!' : <FiSend className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-premium-gold animate-pulse font-sans">
                ✓ Thank you for subscribing to our premium updates!
              </p>
            )}

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300" aria-label="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300" aria-label="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300" aria-label="WhatsApp">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300" aria-label="YouTube">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0">
          <p>© 2026 Optic World Showroom. All Rights Reserved. Designed for Elegant Luxury.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-premium-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-premium-gold transition-colors">Terms of Service</Link>
            <Link to="/gallery" className="hover:text-premium-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
