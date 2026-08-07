import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGift, FiCopy, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const OfferModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('OPTICVIP');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShopNow = () => {
    onClose();
    navigate('/products');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Offer Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-[#111827] text-white border-2 border-premium-gold/30 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full z-10 relative p-6 sm:p-8 space-y-6 text-center font-sans"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-2 rounded-full cursor-pointer transition-colors"
              aria-label="Close Offer"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Gift Icon Badge */}
            <div className="mx-auto w-16 h-16 bg-premium-gold/15 text-premium-gold rounded-full flex items-center justify-center border border-premium-gold/30 animate-bounce">
              <FiGift className="w-8 h-8" />
            </div>

            {/* Content Text */}
            <div className="space-y-2">
              <span className="text-[10px] text-premium-gold font-bold uppercase tracking-[0.25em] block">
                Exclusive VIP Offer
              </span>
              <h2 className="text-3xl font-black font-serif tracking-tight text-white m-0">
                Festival of Lights
              </h2>
              <p className="text-sm text-gray-400 font-serif italic">
                Celebrate luxury vision and premium fragrances
              </p>
            </div>

            {/* Offer Main Details Cards */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 space-y-3.5 text-left">
              <div className="border-b border-gray-800 pb-3 flex items-start space-x-3">
                <span className="text-premium-gold font-bold text-lg mt-0.5">01</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Buy 1 Get 1 FREE</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    Applicable on all premium spectacle frames & designer sunglasses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-premium-gold font-bold text-lg mt-0.5">02</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Complimentary Scent</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    Get a premium 6ml MEHAKAANA Attar sample with any custom perfume blending order.
                  </p>
                </div>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="space-y-2.5">
              <span className="text-[10px] text-gray-450 uppercase font-black block tracking-widest">
                Use Coupon Code On Checkout
              </span>
              <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden p-1.5 max-w-xs mx-auto justify-between items-center">
                <span className="font-mono font-bold text-sm tracking-wider text-premium-gold pl-3">
                  OPTICVIP
                </span>
                <button
                  onClick={handleCopyCode}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-premium-gold text-royal-blue hover:bg-white hover:text-royal-blue'
                  }`}
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleShopNow}
                className="flex-1 bg-royal-blue dark:bg-gray-800 dark:border dark:border-premium-gold hover:bg-premium-gold dark:hover:bg-premium-gold text-white hover:text-royal-blue dark:hover:text-royal-blue font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow cursor-pointer"
              >
                <span>Shop Collection</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-bold py-3.5 rounded-xl text-sm transition-all border border-gray-800 cursor-pointer"
              >
                No thanks, I will explore
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OfferModal;
