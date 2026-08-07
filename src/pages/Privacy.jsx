import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';

const Privacy = () => {
  const breadcrumbItems = [{ label: 'Privacy Policy', path: '/privacy' }];

  return (
    <div className="min-h-screen bg-gray-55 dark:bg-[#070a13] text-gray-900 dark:text-gray-100 font-sans relative overflow-hidden pb-16 pt-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-premium-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Helmet>
          <title>Privacy Policy | Optic World & Mehakaana</title>
          <meta name="description" content="Read our privacy policy to understand how Optic World collects, protects, and handles your customer details and custom Attar compound data securely." />
        </Helmet>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <Breadcrumb items={breadcrumbItems} />
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase block">Data Protection</span>
          <h1 className="text-4xl font-serif font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-center space-x-2.5">
            <FiShield className="text-premium-gold w-9 h-9 animate-pulse" />
            <span>Privacy Policy</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Last Updated: August 2026. This policy outlines our commitment to managing your personal and prescription data with absolute integrity.
          </p>
        </div>

        {/* Policy Content Blocks */}
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
              <span>1. Information Collection</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              We collect information that you explicitly share with us to fulfill retail operations and service appointments. This includes:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              <li className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Contact info (Full name, address, phone number)</span>
              </li>
              <li className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Lens prescriptions and checkup bookings</span>
              </li>
              <li className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Bespoke Attar fragrance compound formulations</span>
              </li>
              <li className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Client device preferences (theme logs, local storage)</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>2. How We Protect Your Data</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Unlike generic platforms, **Optic World** does not log customer transaction databases on remote unencrypted clouds. Your products checkout inputs are compiled and processed via local memory state logic, transferring the final invoices directly and securely to our sales hotline via official WhatsApp end-to-end encryption channels.
            </p>
            <div className="p-4 bg-gray-50 dark:bg-black/30 border border-gray-150 dark:border-gray-800/80 rounded-2xl flex items-start space-x-3">
              <FiLock className="text-premium-gold w-4.5 h-4.5 mt-0.5 shrink-0" />
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                <span className="font-semibold block text-gray-900 dark:text-white mb-0.5">WhatsApp Privacy Protection</span>
                Once transferred, messages are secured by WhatsApp’s native encryption. We will never share your telephone number with external data aggregators.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>3. Cookies & LocalStorage</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              We employ standard `localStorage` states to deliver client convenience. This includes preserving your curated Wishlist, custom fragrance compounding combinations, dark/light theme choices, and staff passcode check logs. No tracking cookies are set, and your browsing remains anonymous.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-premium-gold rounded-full block"></span>
              <span>4. Your Rights</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              You possess complete authority over your details. At any point, you can clear browser history settings to purge wishlist files and Attar logs instantly, or reach out to our primary dispatch hotline at **+91 7880009292** to request standard database deletions.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
