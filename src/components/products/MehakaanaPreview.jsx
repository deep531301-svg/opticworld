import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiInfo } from 'react-icons/fi';
import { FaWhatsapp, FaFlask } from 'react-icons/fa';
import CheckoutModal from './CheckoutModal';

const MehakaanaPreview = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [step, setStep] = useState(1); // 1: Base, 2: Heart, 3: Top, 4: Bottle, 5: Review
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedHeart, setSelectedHeart] = useState(null);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottle, setSelectedBottle] = useState(null);

  const bases = [
    { id: 'b-oud', name: 'Royal Cambodian Oud', type: 'Woody / Balsamic', desc: 'Deep, warm, exotic woodiness that acts as a strong anchor.', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200' },
    { id: 'b-musk', name: 'White Kashmiri Musk', type: 'Powdery / Clean', desc: 'Soft, velvety, clean aroma with animalic undertones.', image: 'https://images.unsplash.com/photo-1605656811221-229f3f345be1?auto=format&fit=crop&q=80&w=200' },
    { id: 'b-rose', name: 'Taifi Rose oil', type: 'Rich Floral', desc: 'Sweet, honey-like premium rose distillate from Taif.', image: 'https://images.unsplash.com/photo-1615655496458-a56577883cca?auto=format&fit=crop&q=80&w=200' },
    { id: 'b-amber', name: 'Golden Amber resin', type: 'Warm / Sweet', desc: 'Resinous, sweet, cozy warmth with vanilla touches.', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=200' },
  ];

  const hearts = [
    { id: 'h-saffron', name: 'Exotic Saffron', type: 'Spicy / Leathery', desc: 'Rich, bittersweet leathery spice adding luxury depth.' },
    { id: 'h-jasmine', name: 'Night Jasmine', type: 'Sweet Floral', desc: 'Indolic, narcotic, intensely romantic white floral.' },
    { id: 'h-patchouli', name: 'Earthy Patchouli', type: 'Earthy / Sweet', desc: 'Damp earth, sweet herbs, adds a bohemian classic layer.' },
    { id: 'h-vanilla', name: 'Madagascar Vanilla', type: 'Gourmand Sweet', desc: 'Rich, creamy, balsamic sweetness.' },
  ];

  const tops = [
    { id: 't-bergamot', name: 'Calabrian Bergamot', type: 'Zesty Citrus', desc: 'Crisp, peppery, highly fresh citrus zest opening.' },
    { id: 't-mint', name: 'Crushed Peppermint', type: 'Herbal Fresh', desc: 'Cool, icy, sharp herbal freshness.' },
    { id: 't-seasalt', name: 'Sea Salt & Sage', type: 'Marine Fresh', desc: 'Mineral spray, drift wood, seaside breezes.' },
    { id: 't-grapefruit', name: 'Pink Grapefruit', type: 'Tangy Citrus', desc: 'Bright, bitter-sweet, energetic splash.' },
  ];

  const bottles = [
    { id: 'bt-gold', name: 'Royal Gold Decanter', type: 'Oil Roll-on', size: '12ml (Tola)', extra: 'Intricate brass filigree casing', price: 2999 },
    { id: 'bt-crystal', name: 'Sleek Crystal Atomizer', type: 'Perfume Spray', size: '50ml (EDP)', extra: 'Heavy bottom polished glass', price: 3499 },
    { id: 'bt-roll', name: 'Classic Glass Roll-On', type: 'Oil Roll-on', size: '6ml (Half Tola)', extra: 'Handy pocket travel size', price: 1999 },
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const getScentName = () => {
    if (!selectedBase || !selectedTop) return 'My Bespoke Scent';
    const topWord = selectedTop.name.split(' ').pop();
    const baseWord = selectedBase.name.split(' ').pop();
    return `Mehakaana ${topWord} & ${baseWord} Blend`;
  };

  const getScentPrice = () => {
    return selectedBottle ? selectedBottle.price : 1999;
  };

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOrder = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 35 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col font-sans relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white p-2.5 rounded-full shadow cursor-pointer transition-all duration-200"
            aria-label="Close Preview"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Banner Header */}
          <div className="bg-gradient-to-r from-royal-blue to-black text-white p-6 sm:p-8 flex items-center space-x-4 border-b border-premium-gold/30">
            <div className="p-3 bg-premium-gold/20 text-premium-gold rounded-full border border-premium-gold/30">
              <FaFlask className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-premium-gold font-bold uppercase tracking-[0.25em] block">
                MEHAKAANA Fragrance Lab
              </span>
              <h2 className="text-2xl font-bold font-serif tracking-tight text-white m-0">
                Bespoke Scent Blending Bar
              </h2>
            </div>
          </div>

          {/* Interactive Lab Content Area */}
          <div className="flex flex-col md:flex-row flex-1">
            
            {/* LEFT: STEP SELECTOR OPTIONS */}
            <div className="flex-1 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 space-y-6">
              {/* Progress Steps Header */}
              <div className="flex justify-between items-center text-xs text-gray-450 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="uppercase tracking-wider">Step {step} of 5</span>
                <span className="text-premium-gold">
                  {step === 1 && "Choose Base Note"}
                  {step === 2 && "Choose Heart Note"}
                  {step === 3 && "Choose Top Note"}
                  {step === 4 && "Select Bottle"}
                  {step === 5 && "Review Recipe"}
                </span>
              </div>

              {/* STEP 1: CHOOSE BASE */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed flex items-center">
                    <FiInfo className="mr-1.5 text-premium-gold shrink-0 w-4 h-4" />
                    Bases anchor the perfume and are the longest lasting elements that react to skin warmth.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bases.map((base) => (
                      <button
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`text-left p-4 rounded-2xl border transition-all flex space-x-3 items-center cursor-pointer ${
                          selectedBase?.id === base.id
                            ? 'border-premium-gold bg-premium-gold/5 dark:bg-premium-gold/10'
                            : 'border-gray-150 dark:border-gray-800 hover:border-premium-gold bg-transparent'
                        }`}
                      >
                        <img src={base.image} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-primary-text dark:text-white truncate">{base.name}</h4>
                          <span className="text-[10px] text-premium-gold uppercase tracking-wider block font-sans">{base.type}</span>
                          <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{base.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE HEART */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed flex items-center">
                    <FiInfo className="mr-1.5 text-premium-gold shrink-0 w-4 h-4" />
                    Heart notes emerge after top notes fade, defining the main theme of your scent profile.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hearts.map((heart) => (
                      <button
                        key={heart.id}
                        onClick={() => setSelectedHeart(heart)}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          selectedHeart?.id === heart.id
                            ? 'border-premium-gold bg-premium-gold/5 dark:bg-premium-gold/10'
                            : 'border-gray-150 dark:border-gray-800 hover:border-premium-gold bg-transparent'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm text-primary-text dark:text-white">{heart.name}</h4>
                          <span className="text-[10px] text-premium-gold uppercase tracking-wider block font-sans">{heart.type}</span>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{heart.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE TOP */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed flex items-center">
                    <FiInfo className="mr-1.5 text-premium-gold shrink-0 w-4 h-4" />
                    Top notes are the first scents you smell. They open bright, zesty, and energetic.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tops.map((top) => (
                      <button
                        key={top.id}
                        onClick={() => setSelectedTop(top)}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          selectedTop?.id === top.id
                            ? 'border-premium-gold bg-premium-gold/5 dark:bg-premium-gold/10'
                            : 'border-gray-150 dark:border-gray-800 hover:border-premium-gold bg-transparent'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm text-primary-text dark:text-white">{top.name}</h4>
                          <span className="text-[10px] text-premium-gold uppercase tracking-wider block font-sans">{top.type}</span>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{top.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: CHOOSE BOTTLE */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed flex items-center">
                    <FiInfo className="mr-1.5 text-premium-gold shrink-0 w-4 h-4" />
                    Select your preferred bottle style, volume size, and application type.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {bottles.map((bottle) => (
                      <button
                        key={bottle.id}
                        onClick={() => setSelectedBottle(bottle)}
                        className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between h-40 cursor-pointer ${
                          selectedBottle?.id === bottle.id
                            ? 'border-premium-gold bg-premium-gold/5 dark:bg-premium-gold/10'
                            : 'border-gray-150 dark:border-gray-800 hover:border-premium-gold bg-transparent'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm text-primary-text dark:text-white">{bottle.name}</h4>
                          <span className="text-[10px] text-premium-gold uppercase tracking-wider block font-sans">{bottle.type} ({bottle.size})</span>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{bottle.extra}</p>
                        </div>
                        <span className="text-base font-black text-royal-blue dark:text-premium-gold block mt-2">₹{bottle.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW RECIPE */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl border border-gray-150 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-serif font-bold text-primary-text dark:text-white text-center border-b border-gray-200 dark:border-gray-700 pb-2">
                      {getScentName()}
                    </h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1.5">
                        <span className="text-gray-400">Base Note:</span>
                        <span className="font-bold text-primary-text dark:text-white">{selectedBase?.name || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1.5">
                        <span className="text-gray-400">Heart Note:</span>
                        <span className="font-bold text-primary-text dark:text-white">{selectedHeart?.name || 'None'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1.5">
                        <span className="text-gray-400">Top Note:</span>
                        <span className="font-bold text-primary-text dark:text-white">{selectedTop?.name || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1.5">
                        <span className="text-gray-400">Bottle Casing:</span>
                        <span className="font-bold text-primary-text dark:text-white">
                          {selectedBottle ? `${selectedBottle.name} (${selectedBottle.size})` : 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 text-sm">
                        <span className="text-gray-400 uppercase font-black tracking-wider">Estimated Price:</span>
                        <span className="font-black text-royal-blue dark:text-premium-gold">₹{getScentPrice()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    By clicking order, your recipe will be formatted into a WhatsApp message directly to our compounding lab.
                  </p>
                </div>
              )}

              {/* Navigation button rows */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-xs font-semibold rounded-xl text-gray-650 dark:text-white hover:bg-gray-200 transition-colors disabled:opacity-30 cursor-pointer"
                >
                  Back
                </button>

                {step < 5 ? (
                  <button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !selectedBase) ||
                      (step === 3 && !selectedTop) ||
                      (step === 4 && !selectedBottle)
                    }
                    className="px-5 py-2.5 bg-royal-blue dark:bg-gray-800 text-white dark:text-premium-gold border border-premium-gold/30 text-xs font-bold rounded-xl hover:bg-premium-gold hover:text-royal-blue transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleOrder}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: LIVE COMPOUNDING PREVIEW CARD */}
            <div className="w-full md:w-80 p-6 sm:p-8 bg-gray-50 dark:bg-gray-950/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-royal-blue dark:text-premium-gold tracking-wider font-sans">
                  Live Compounding
                </h4>
                
                {/* Visual Glass flask compounding graphics */}
                <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4 shadow-sm min-h-[160px]">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <FaFlask className="text-premium-gold w-10 h-10 animate-bounce" />
                    {selectedBase && (
                      <span className="absolute bottom-1 bg-royal-blue text-[8px] text-white px-1.5 py-0.5 rounded-full border border-premium-gold">
                        Base
                      </span>
                    )}
                  </div>
                  
                  <div className="text-center space-y-1">
                    <h5 className="text-xs font-bold text-primary-text dark:text-white font-sans">
                      {getScentName()}
                    </h5>
                    <span className="text-[10px] text-gray-400 capitalize block">
                      {selectedBottle ? `${selectedBottle.type} | ${selectedBottle.size}` : 'Pending Bottle Setup'}
                    </span>
                  </div>
                </div>

                {/* Selected Notes Summary Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-450 uppercase font-black block font-sans">Compounding Elements</span>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Base:</span>
                      <span className="font-bold text-primary-text dark:text-white truncate max-w-[130px]">
                        {selectedBase ? selectedBase.name : 'Choose...'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Heart:</span>
                      <span className="font-bold text-primary-text dark:text-white truncate max-w-[130px]">
                        {selectedHeart ? selectedHeart.name : 'Optional'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">Top:</span>
                      <span className="font-bold text-primary-text dark:text-white truncate max-w-[130px]">
                        {selectedTop ? selectedTop.name : 'Choose...'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing banner */}
              <div className="pt-4 border-t border-gray-150 dark:border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest font-sans">Formula Price</span>
                <span className="text-lg font-black text-royal-blue dark:text-premium-gold font-sans">₹{getScentPrice()}</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Checkout Summary Drawer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={{
          id: "custom-scent",
          name: getScentName(),
          base: selectedBase?.name,
          heart: selectedHeart?.name || 'None',
          top: selectedTop?.name,
          bottle: selectedBottle ? `${selectedBottle.name} (${selectedBottle.size} - ${selectedBottle.type})` : '',
          price: getScentPrice()
        }}
        isCustomScent={true}
      />
    </AnimatePresence>
  );
};

export default MehakaanaPreview;
