import React, { useState } from 'react';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';
import { useData } from '../context/DataContext';
import VipModal from '../components/common/VipModal';

const Offers = () => {
  const { offers } = useData();
  const [copiedCode, setCopiedCode] = useState(null);
  const [isVipOpen, setIsVipOpen] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const breadcrumbItems = [{ label: 'Offers', path: '/offers' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <Helmet>
        <title>Exclusive Festive Sales & Privilege VIP Club | Optic World</title>
        <meta name="description" content="Get special seasonal discounts, copy online coupon codes like OPTICVIP, and register online for our exclusive VIP Privilege Card." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
          Bespoke Discounts & Rewards
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
          Special Promotions
        </h1>
        <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Ambient gold glow decoration */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-premium-gold/5 rounded-full blur-xl pointer-events-none"></div>

            <div className="space-y-4">
              {/* Badge & Expiry */}
              <div className="flex justify-between items-center">
                <span className="bg-royal-blue/10 dark:bg-premium-gold/15 text-royal-blue dark:text-premium-gold border border-royal-blue/20 dark:border-premium-gold/25 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {offer.badge}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Expires: {offer.expiry}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-primary-text dark:text-white leading-snug">
                  {offer.title}
                </h3>
                <p className="text-xs text-secondary-text dark:text-gray-400 leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </div>

            {/* Action coupon copy */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl flex justify-between items-center gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans">Coupon Code</span>
                <span className="text-sm font-bold font-mono text-royal-blue dark:text-white truncate">
                  {offer.code}
                </span>
              </div>

              <button
                onClick={() => handleCopyCode(offer.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                  copiedCode === offer.code
                    ? 'bg-emerald-500 text-white shadow'
                    : 'bg-royal-blue hover:bg-premium-gold text-white hover:text-royal-blue dark:bg-gray-800 dark:hover:bg-premium-gold dark:text-premium-gold dark:hover:text-royal-blue border border-premium-gold/30'
                }`}
                aria-label={`Copy coupon code ${offer.code}`}
              >
                {copiedCode === offer.code ? (
                  <>
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loyalty membership section */}
      <section className="bg-gradient-to-r from-royal-blue to-black text-white p-8 sm:p-12 rounded-3xl border border-premium-gold/30 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Optic World VIP Club
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight leading-snug">
            Join Our Privilege Membership
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Receive lifetime complimentary frame polishing, 10% cashbacks on all sunglasses, priority optical appointment slots, and invitation-only previews of imported perfume releases. Register online today for free!
          </p>
          <button
            onClick={() => setIsVipOpen(true)}
            className="bg-premium-gold hover:bg-white text-royal-blue px-6 py-3 rounded-xl text-xs font-bold transition-all shadow cursor-pointer uppercase tracking-wider block mx-auto md:mx-0 font-sans"
          >
            Join VIP Privilege Club
          </button>
        </div>

        <div
          onClick={() => setIsVipOpen(true)}
          className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 hover:border-premium-gold/50 p-6 rounded-2xl text-center max-w-xs w-full shadow-lg font-sans cursor-pointer transition-all hover:scale-[1.03] active:scale-95 group"
        >
          <span className="text-[10px] text-premium-gold font-bold uppercase tracking-widest block mb-1">VIP Card</span>
          <span className="text-lg font-black tracking-widest font-serif block">OPTIC WORLD</span>
          <span className="text-xs text-gray-400 font-mono block mt-1"># PRIV-8820-2026</span>
          <button className="mt-4 w-full text-xs font-bold bg-premium-gold hover:bg-white text-royal-blue px-4 py-2 rounded-lg cursor-pointer transition-colors shadow">
            Register Online
          </button>
        </div>
      </section>

      {/* VIP Enrollment Modal */}
      <VipModal isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} />
    </div>
  );
};

export default Offers;
