import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { DataProvider } from './context/DataContext';

// Core layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingActions from './components/common/FloatingActions';
import BackToTop from './components/common/BackToTop';
import SplashLoader from './components/common/SplashLoader';
import OfferModal from './components/common/OfferModal';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Brands from './pages/Brands';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Scroll to top helper on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOffer, setShowOffer] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (window.location.pathname !== '/admin') {
      setTimeout(() => {
        setShowOffer(true);
      }, 7000); // Trigger premium voucher popup 7 seconds after splash loader concludes
    }
  };

  return (
    <HelmetProvider>
      <DataProvider>
        <ThemeProvider>
          <WishlistProvider>
            {/* Full Screen Page Entrance Loader */}
            <AnimatePresence mode="wait">
              {showSplash && (
                <SplashLoader onComplete={handleSplashComplete} />
              )}
            </AnimatePresence>

          <Router>
            <ScrollToTop />
            
            {/* Global SEO Settings */}
            <Helmet>
              <title>Optic World | Premium Eyewear & Fragrance Boutique</title>
              <meta name="description" content="Optic World is a luxury optical showroom and fragrance boutique in Ludhiana. Sourcing designer sunglasses, prescription glasses, pure Cambodian oud Attar, and premium perfumes." />
              <meta name="keywords" content="optical shop, sunglasses showroom, prescription glasses, contact lenses, imported attar, oud oil, designer perfumes, Ferozepur Road" />
              <html lang="en" />
            </Helmet>

            {!showSplash && (
              <div className="flex flex-col min-h-screen bg-primary-bg transition-colors duration-300 text-primary-text">
                
                {/* Responsive Navigation header */}
                <Navbar />

                {/* Offer Modal Popup */}
                <OfferModal isOpen={showOffer} onClose={() => setShowOffer(false)} />

                {/* Main Content wrapper */}
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                  </Routes>
                </main>

                {/* Sticky bottom floating contact CTA widgets */}
                <FloatingActions />

                {/* Back to top scroll button */}
                <BackToTop />

                {/* Multi-column footer sitemap */}
                <Footer />

              </div>
            )}
          </Router>
        </WishlistProvider>
      </ThemeProvider>
    </DataProvider>
  </HelmetProvider>
  );
}

export default App;
