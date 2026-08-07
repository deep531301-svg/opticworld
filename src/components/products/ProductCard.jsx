import React, { useState } from 'react';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import CheckoutModal from './CheckoutModal';

const ProductCard = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const liked = isInWishlist(product.id);

  // Buy URL
  const buyMessage = encodeURIComponent(
    `Hello Optic World, I am interested in purchasing the product:\n- Name: ${product.name}\n- Brand: ${product.brand}\n- Price: ₹${product.price}\n- Code/Id: ${product.id}\nPlease let me know availability and pickup/delivery options.`
  );
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
      {/* Category/Type Badge */}
      <span className="absolute top-4 left-4 z-10 bg-royal-blue/90 dark:bg-black/95 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-premium-gold/30">
        {product.category.replace('-', ' ')}
      </span>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-red-500 shadow hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label={liked ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <FiHeart className={`w-4 h-4 ${liked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
      </button>

      {/* Product Image Wrapper */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 dark:bg-gray-950 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick View Overlay (Desktop only) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center space-x-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white text-royal-blue hover:bg-premium-gold hover:text-royal-blue rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center"
            title="Quick View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col space-y-2 justify-between">
        <div className="space-y-1">
          {/* Brand & Stars */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-premium-gold font-bold uppercase tracking-wider font-sans">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1 text-amber-400">
              <FaStar className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 font-sans">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-primary-text dark:text-white line-clamp-1 group-hover:text-premium-gold transition-colors duration-200">
            {product.name}
          </h3>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-sans uppercase tracking-wider">Price</span>
            <span className="text-lg font-bold text-royal-blue dark:text-premium-gold font-sans">
              ₹{product.price}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick View for Mobile/Tablet */}
            <button
              onClick={() => onQuickView(product)}
              className="md:hidden p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Quick View"
            >
              <FiEye className="w-4 h-4" />
            </button>

            {/* Buy Now WhatsApp Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-royal-blue hover:bg-premium-gold dark:bg-gray-800 dark:border dark:border-premium-gold dark:hover:bg-premium-gold text-white dark:text-white hover:text-royal-blue dark:hover:text-royal-blue px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 shadow hover:shadow-md cursor-pointer border border-transparent"
              id={`buy-button-${product.id}`}
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Summary Drawer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductCard;
