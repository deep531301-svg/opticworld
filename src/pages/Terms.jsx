import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBookOpen, FiFileText, FiCheckCircle } from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';

const Terms = () => {
  const breadcrumbItems = [{ label: 'Terms of Service', path: '/terms' }];

  return (
    <div className="min-h-screen bg-gray-55 dark:bg-[#070a13] text-gray-900 dark:text-gray-100 font-sans relative overflow-hidden pb-16 pt-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-premium-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Helmet>
          <title>Terms of Service | Optic World & Mehakaana</title>
          <meta name="description" content="Review the Terms of Service for Optic World and Mehakaana fragrance blending showroom before placing orders." />
        </Helmet>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <Breadcrumb items={breadcrumbItems} />
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase block">Legal Framework</span>
          <h1 className="text-4xl font-serif font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-center space-x-2.5">
            <FiBookOpen className="text-premium-gold w-9 h-9 animate-pulse" />
            <span>Terms of Service</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Last Updated: August 2026. By accessing our showroom portal and purchasing catalog items, you agree to these legal conditions.
          </p>
        </div>

        {/* Terms Content Blocks */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-8 sm:p-10 rounded-3xl shadow-sm space-y-8 text-left"
        >
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>1. Retail Orders & WhatsApp Booking</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Our website serves as an interactive catalog and order assembly platform. Clicking "Send Order to WhatsApp" compiles your selection (eyewear specs, custom Attar fragrance formulas) and forwards it to our Ludhiana showroom sales hotline (**+91 7880009292**).
            </p>
            <ul className="space-y-2 pl-2 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <FiCheckCircle className="text-premium-gold w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Orders sent via WhatsApp are considered **requests for confirmation** and frame/perfume availability check, not final purchases.</span>
              </li>
              <li className="flex items-start space-x-2">
                <FiCheckCircle className="text-premium-gold w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>In-store pricing, coupon applicability, and lens parameters will be finalized and confirmed directly by our boutique staff during checkout.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>2. Fragrance Compounding Disclaimer</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Mehakaana offers customized perfume oil attar blending. While we utilize organic essential extracts (Cambodian Oud, French Jasmine, Rose, Sandalwood, Musk), custom fragrance blends cannot be returned or refunded once compiled to client specifications.
            </p>
            <div className="p-4 bg-amber-500/5 dark:bg-premium-gold/5 border border-premium-gold/20 rounded-2xl flex items-start space-x-3">
              <FiFileText className="text-premium-gold w-4.5 h-4.5 mt-0.5 shrink-0" />
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                <span className="font-semibold block text-gray-900 dark:text-white mb-0.5">Skin Sensitivity Recommendation</span>
                Since custom blends contain pure botanical extracts, we strongly recommend performing a small patch test on your wrist before applying custom Attars directly to sensitive skin areas.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>3. Lens Prescription & Consultations</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Optical checkup reservations booked through the portal are free service requests. Actual eye examinations are performed in-store by certified optometrists using computerized vision diagnostics. Patients must verify current prescription dates before finalizing customized progressive/single-vision lens fitments.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>4. Designer Eyewear Warranties</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Original branded sunglasses and spectacle frames (Ray-Ban, Oakley, Carrera, Titan, etc.) carry standard manufacturer warranties against structural defaults. Warranties do not cover lens scratches or accidental physical frame snapping after purchase handover.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
