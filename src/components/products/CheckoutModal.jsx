import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiTruck, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useData } from '../../context/DataContext';

const CheckoutModal = ({ isOpen, onClose, product, products = [], isCustomScent = false }) => {
  const { phoneNumber, incrementOrdersCount, offers } = useData();
  const [name, setName] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' or 'pickup'
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');

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

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    
    // Find matching coupon in the database offers array
    const foundCoupon = offers?.find(o => o.code.trim().toUpperCase() === code);
    
    if (foundCoupon) {
      setIsCouponApplied(true);
      setCouponMsg(`✓ Code Applied: ${foundCoupon.title}`);
    } else if (code === 'OPTICVIP') {
      setIsCouponApplied(true);
      setCouponMsg('✓ Code Applied: Buy 1 Get 1 Free Promo Included');
    } else if (code === 'MEHAKAANA15') {
      setIsCouponApplied(true);
      setCouponMsg('✓ Code Applied: Complimentary 6ml Attar Sample Included');
    } else if (code) {
      setIsCouponApplied(false);
      setCouponMsg('❌ Invalid Coupon Code');
    } else {
      setIsCouponApplied(false);
      setCouponMsg('');
    }
  };

  const hasMultiple = products && products.length > 0;
  
  if (!product && !hasMultiple) return null;

  // Calculate prices
  const getSubtotal = () => {
    if (hasMultiple) {
      return products.reduce((acc, p) => acc + Number(p.price), 0);
    }
    return product ? Number(product.price) : 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      setValidationError('Please enter your delivery address.');
      return;
    }

    setValidationError('');

    // Format the WhatsApp message beautifully
    let message = '';
    
    if (hasMultiple) {
      message = 
        `👓 *OPTIC WORLD Multi-Item Checkout Order* ✨\n\n` +
        `👤 *Customer Name:* ${name}\n` +
        `📦 *Order Type:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'Showroom Pickup'}\n`;
      
      if (deliveryType === 'delivery') {
        message += `📍 *Delivery Address:* ${address}\n`;
      }
      
      message += `\n🛍️ *Selected Products:* \n`;
      products.forEach((item, idx) => {
        message += `${idx + 1}. *${item.name}* (${item.brand}) - ₹${item.price} [Code: ${item.id}]\n`;
      });
      
      message += `\n💰 *Grand Total:* ₹${getSubtotal()}\n`;
    } else if (isCustomScent) {
      message = 
        `✨ *MEHAKAANA BESPOKE Fragrance Order* ✨\n\n` +
        `👤 *Customer Name:* ${name}\n` +
        `📦 *Order Type:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'Showroom Pickup'}\n`;
      
      if (deliveryType === 'delivery') {
        message += `📍 *Delivery Address:* ${address}\n`;
      }
      
      message += 
        `\n` +
        `🧪 *Custom Formula:* ${product.name}\n` +
        `▫️ *Base Note:* ${product.base}\n` +
        `▫️ *Heart Note:* ${product.heart || 'None'}\n` +
        `▫️ *Top Note:* ${product.top}\n` +
        `▫️ *Bottle:* ${product.bottle}\n` +
        `💰 *Estimated Total:* ₹${product.price}\n`;
    } else {
      message = 
        `👓 *OPTIC WORLD Showroom Order* ✨\n\n` +
        `👤 *Customer Name:* ${name}\n` +
        `📦 *Order Type:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'Showroom Pickup'}\n`;
      
      if (deliveryType === 'delivery') {
        message += `📍 *Delivery Address:* ${address}\n`;
      }
      
      message += 
        `\n` +
        `🛍️ *Product Details:* \n` +
        `▫️ *Name:* ${product.name}\n` +
        `▫️ *Brand:* ${product.brand}\n` +
        `▫️ *Category:* ${product.category?.replace('-', ' ')}\n` +
        `💰 *Price:* ₹${product.price}\n` +
        `▫️ *Product Code:* ${product.id}\n`;
    }

    if (notes.trim()) {
      message += `\n📝 *Custom Instructions / Notes:* \n${notes}\n`;
    }

    if (isCouponApplied) {
      const code = couponCode.trim().toUpperCase();
      const foundCoupon = offers?.find(o => o.code.trim().toUpperCase() === code);
      if (foundCoupon) {
        message += `\n🎁 *Applied Promo:* ${code} (${foundCoupon.title})\n`;
      } else if (code === 'OPTICVIP') {
        message += `\n🎁 *Applied Promo:* OPTICVIP (Buy 1 Get 1 Free Frame/Sunglasses)\n`;
      } else if (code === 'MEHAKAANA15') {
        message += `\n🎁 *Applied Promo:* MEHAKAANA15 (Complimentary 6ml Attar Sample)\n`;
      }
    }

    message += `\n*Please verify availability and dispatch schedule. Thank you!*`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    incrementOrdersCount();
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full z-10 relative flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh] overflow-y-auto no-scrollbar font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white p-2.5 rounded-full z-20 cursor-pointer transition-colors shadow-sm"
              aria-label="Close Checkout"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* LEFT COLUMN: Product Overview (Padded Dark Panel) */}
            <div className="w-full md:w-5/12 p-6 bg-gray-50 dark:bg-gray-950/40 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] text-premium-gold font-bold uppercase tracking-[0.25em] block">
                  Boutique Checkout
                </span>
                
                {/* Scrollable list if multiple items */}
                {hasMultiple ? (
                  <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                      Order Summary ({products.length} Items)
                    </span>
                    {products.map((item) => (
                      <div key={item.id} className="flex space-x-2.5 items-center bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-2.5 rounded-xl shadow-sm">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-800 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] text-premium-gold font-semibold uppercase tracking-wider block leading-none mb-0.5">{item.brand}</span>
                          <h4 className="text-xs font-bold text-primary-text dark:text-white truncate leading-none">{item.name}</h4>
                          <span className="text-[10px] font-bold text-royal-blue dark:text-premium-gold block mt-1 leading-none font-sans">₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Single item overview */
                  <div className="space-y-3">
                    {!isCustomScent && product.image && (
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 shadow-sm max-h-40">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <span className="text-[10px] text-premium-gold font-bold uppercase tracking-wider block font-sans">
                        {isCustomScent ? 'Bespoke Blend' : product.brand}
                      </span>
                      <h3 className="text-lg font-bold font-serif text-primary-text dark:text-white leading-tight">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Scent Compound Details if custom */}
                {isCustomScent && !hasMultiple && (
                  <div className="space-y-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-3.5 rounded-2xl">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Base:</span>
                      <span className="font-bold text-primary-text dark:text-white">{product.base}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Heart:</span>
                      <span className="font-bold text-primary-text dark:text-white">{product.heart || 'None'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Top:</span>
                      <span className="font-bold text-primary-text dark:text-white">{product.top}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-400">Bottle:</span>
                      <span className="font-bold text-primary-text dark:text-white truncate max-w-[130px]">{product.bottle}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Banner */}
              <div className="pt-4 border-t border-gray-150 dark:border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-sans font-black">
                  {hasMultiple ? 'Total Sum' : 'Subtotal'}
                </span>
                <span className="text-2xl font-black text-royal-blue dark:text-premium-gold font-sans">
                  ₹{getSubtotal()}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Shipping Details & Prescription forms */}
            <form onSubmit={handleCheckout} className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-primary-text dark:text-white m-0">
                    Secure Delivery Details
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Fill in your details below. We will bundle your custom formula/eyewear specs and transfer you directly to our sales agent on WhatsApp to finalize checkout.
                  </p>
                </div>

                {/* Validation Banner */}
                {validationError && (
                  <div className="p-3 bg-red-500/10 text-red-500 text-xs font-semibold rounded-xl border border-red-500/20 text-center">
                    ⚠️ {validationError}
                  </div>
                )}

                <div className="space-y-3.5">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harvinder Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold dark:text-white text-primary-text font-sans font-medium"
                    />
                  </div>

                  {/* Delivery Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Delivery Option *
                    </label>
                    <div className="grid grid-cols-2 gap-3.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                          deliveryType === 'delivery'
                            ? 'border-premium-gold bg-premium-gold/5 text-royal-blue dark:text-premium-gold'
                            : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-500'
                        }`}
                      >
                        <FiTruck className="w-4 h-4" />
                        <span>Home Delivery</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('pickup')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                          deliveryType === 'pickup'
                            ? 'border-premium-gold bg-premium-gold/5 text-royal-blue dark:text-premium-gold'
                            : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-500'
                        }`}
                      >
                        <FiMapPin className="w-4 h-4" />
                        <span>Store Pickup</span>
                      </button>
                    </div>
                  </div>

                  {/* Conditional Address Textarea */}
                  {deliveryType === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1"
                    >
                      <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows="2"
                        placeholder="Enter full street, sector, city, and pincode..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold dark:text-white text-primary-text font-sans leading-relaxed"
                      />
                    </motion.div>
                  )}

                  {/* Coupon Code Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Voucher / Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="e.g. OPTICVIP"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setIsCouponApplied(false);
                          setCouponMsg('');
                        }}
                        className="flex-1 px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold dark:text-white text-primary-text font-sans font-medium"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-royal-blue text-white px-4 rounded-xl text-xs font-bold hover:bg-premium-gold hover:text-royal-blue transition-colors cursor-pointer border border-transparent"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <p className={`text-[10px] font-bold font-sans mt-1 ${isCouponApplied ? 'text-emerald-500 animate-pulse' : 'text-red-500'}`}>
                        {couponMsg}
                      </p>
                    )}
                  </div>

                  {/* Prescription Power / Gift notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      {isCustomScent || hasMultiple ? 'Custom Instructions / Notes' : 'Lens Prescription / Frame Adjustments'}
                    </label>
                    <textarea
                      rows="2"
                      placeholder={
                        isCustomScent || hasMultiple
                          ? "e.g. Write any special delivery/wrapping instructions..." 
                          : "e.g. Sph: -1.50, Cyl: -0.50, Axis: 90 / Blue cut anti-glare coating..."
                      }
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold dark:text-white text-primary-text font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Secure Checkout CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  id="checkout-submit-button"
                >
                  <FaWhatsapp className="w-4.5 h-4.5" />
                  <span>Send Order to WhatsApp Lab</span>
                  <FiLock className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center justify-center space-x-1.5 mt-2.5 text-[10px] text-gray-400 font-sans">
                  <FiCheckCircle className="text-emerald-500 w-3 h-3" />
                  <span>Secure connection to Optic World WhatsApp Business Support.</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
