import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart } from 'react-icons/fi';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import CheckoutModal from './CheckoutModal';

const QuickView = ({ product, onClose }) => {
  if (!product) return null;

  const { isInWishlist, toggleWishlist } = useWishlist();
  const liked = isInWishlist(product.id);
  const [activeImg, setActiveImg] = useState(product.image);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Fallback to product.image if product.images is undefined or empty
  const imageGallery = product.images && product.images.length > 0 ? product.images : [product.image];

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh] md:max-h-[90vh] overflow-y-auto z-10 flex flex-col md:flex-row relative no-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white p-2.5 rounded-full shadow hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 p-3 sm:p-6 flex flex-col justify-center bg-gray-50 dark:bg-gray-955/40 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
            <div className="aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-700 max-h-40 md:max-h-none">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {/* Thumbnail Selectors */}
            {imageGallery.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center">
                {imageGallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImg === imgUrl ? 'border-premium-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 p-5 pb-8 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Category, Brand, Rating */}
              <div className="flex flex-wrap items-center gap-3 pr-12">
                <span className="text-[10px] bg-royal-blue/10 dark:bg-premium-gold/10 text-royal-blue dark:text-premium-gold px-3 py-1 rounded-full uppercase font-bold tracking-widest font-sans border border-royal-blue/20 dark:border-premium-gold/20">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <FaStar className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 font-sans">
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Brand */}
              <div>
                <span className="text-xs text-premium-gold font-bold uppercase tracking-wider block font-sans mb-1">
                  {product.brand} Collection
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-primary-text dark:text-white leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Description */}
              <p className="hidden sm:block text-sm text-secondary-text dark:text-gray-400 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Specifications */}
              {product.specs && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-150 dark:border-gray-700 space-y-2">
                  <h4 className="text-xs uppercase font-bold text-royal-blue dark:text-premium-gold tracking-wider font-sans">
                    Specifications
                  </h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 py-1.5 font-sans">
                        <dt className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
                        <dd className="font-semibold text-primary-text dark:text-white text-right ml-2">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Actions: Price and CTA */}
            <div className="pt-4 border-t border-gray-150 dark:border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-sans">Price</span>
                <p className="text-2xl font-black text-royal-blue dark:text-premium-gold font-sans">₹{product.price}</p>
              </div>

              <div className="flex items-center space-x-3">
                {/* Wishlist Icon Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-red-500 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Toggle Wishlist"
                >
                  <FiHeart className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                </button>

                {/* WhatsApp Buy CTA */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-royal-blue dark:bg-gray-800 dark:border dark:border-premium-gold hover:bg-premium-gold dark:hover:bg-premium-gold text-white hover:text-royal-blue dark:hover:text-royal-blue font-bold px-6 py-3 rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm cursor-pointer border border-transparent"
                  id={`quickview-buy-button-${product.id}`}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Checkout Summary Drawer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />
    </AnimatePresence>
  );
};

export default QuickView;
