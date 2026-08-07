import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAward, FiCheck, FiDownload, FiStar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const VipModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [memberId, setMemberId] = useState('');

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form on open
      setIsEnrolled(false);
      setName('');
      setPhone('');
      setEmail('');
      setDob('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Generate a unique VIP member ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `PRIV-7880-${randomNum}`;
    setMemberId(generatedId);
    setIsEnrolled(true);
  };

  const handleWhatsAppRegister = () => {
    const message = encodeURIComponent(
      `👋 *OPTIC WORLD VIP Privilege Club Enrollment* ✨\n\n` +
      `I would like to activate my online VIP Privilege membership:\n\n` +
      `🎫 *Member ID:* ${memberId}\n` +
      `👤 *Member Name:* ${name}\n` +
      `📱 *Phone Number:* ${phone}\n` +
      `✉️ *Email Address:* ${email || 'N/A'}\n` +
      `📅 *Date of Birth:* ${dob || 'N/A'}\n\n` +
      `*Please register my profile in the database. Thank you!*`
    );
    window.open(`https://wa.me/917880009292?text=${message}`, '_blank');
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-[#111827] text-white border-2 border-premium-gold/30 rounded-3xl overflow-hidden shadow-2xl max-w-md w-full z-10 relative p-6 sm:p-8 space-y-6 text-center font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-2 rounded-full cursor-pointer transition-colors z-25"
              aria-label="Close VIP Form"
            >
              <FiX className="w-5 h-5" />
            </button>

            {!isEnrolled ? (
              /* ENROLLMENT FORM STATE */
              <form onSubmit={handleEnroll} className="space-y-5">
                {/* Header info */}
                <div className="space-y-2">
                  <div className="mx-auto w-12 h-12 bg-premium-gold/15 text-premium-gold rounded-full flex items-center justify-center border border-premium-gold/30">
                    <FiAward className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-premium-gold font-bold uppercase tracking-[0.25em] block">
                    Privilege Enrollment
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white m-0">
                    Join The VIP Club
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Fill in your details below to activate your digital VIP Card and unlock premium cashbacks, priority eye checkups, and exclusive scent previews.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3.5 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaspreet Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold text-white font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 78800 09292"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold text-white font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. vip@member.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold text-white font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider font-sans block">
                      Date of Birth (For Birthday Rewards)
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs focus:outline-none focus:border-premium-gold text-white font-sans"
                    />
                  </div>
                </div>

                {/* Enrollment Button */}
                <button
                  type="submit"
                  className="w-full bg-premium-gold hover:bg-white text-royal-blue font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                >
                  Generate Digital VIP Card
                </button>
              </form>
            ) : (
              /* CARD GENERATION STATE (Virtual Membership Card) */
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em] block animate-pulse">
                    ✓ Activation Complete
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white m-0">
                    Your Digital VIP Card
                  </h3>
                </div>

                {/* VIRTUAL GLASSMORPHIC VIP CARD */}
                <motion.div
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15, duration: 0.8 }}
                  className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black text-white p-6 rounded-2xl border border-premium-gold/30 text-left relative overflow-hidden shadow-2xl space-y-8 min-h-[200px]"
                >
                  {/* Subtle golden light reflection overlay */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-premium-gold/5 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-premium-gold font-bold uppercase tracking-widest font-sans block">
                        VIP Privilege Member
                      </span>
                      <span className="text-lg font-black tracking-widest font-serif block">
                        OPTIC WORLD
                      </span>
                    </div>
                    <div className="flex items-center text-premium-gold space-x-0.5">
                      <FiStar className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[10px] font-black font-sans uppercase">VIP</span>
                    </div>
                  </div>

                  {/* Card Holder & Member ID info */}
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[8px] text-gray-500 uppercase tracking-wider block font-sans">
                        Card Holder
                      </span>
                      <span className="font-bold text-sm tracking-wide block uppercase font-sans text-white max-w-[160px] truncate">
                        {name}
                      </span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[8px] text-gray-500 uppercase tracking-wider block font-sans">
                        Privilege ID
                      </span>
                      <span className="font-mono text-xs text-premium-gold font-bold block">
                        {memberId}
                      </span>
                    </div>
                  </div>

                  {/* Decorative Barcode */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10 flex flex-col items-center">
                    {/* SVG Barcode */}
                    <svg className="w-48 h-7 text-white opacity-60" viewBox="0 0 100 20" fill="currentColor">
                      <rect x="0" y="0" width="2" height="20" />
                      <rect x="3" y="0" width="1" height="20" />
                      <rect x="5" y="0" width="3" height="20" />
                      <rect x="9" y="0" width="1" height="20" />
                      <rect x="11" y="0" width="2" height="20" />
                      <rect x="14" y="0" width="1" height="20" />
                      <rect x="16" y="0" width="4" height="20" />
                      <rect x="21" y="0" width="1" height="20" />
                      <rect x="23" y="0" width="2" height="20" />
                      <rect x="26" y="0" width="3" height="20" />
                      <rect x="30" y="0" width="1" height="20" />
                      <rect x="32" y="0" width="2" height="20" />
                      <rect x="35" y="0" width="4" height="20" />
                      <rect x="40" y="0" width="1" height="20" />
                      <rect x="42" y="0" width="2" height="20" />
                      <rect x="45" y="0" width="3" height="20" />
                      <rect x="49" y="0" width="1" height="20" />
                      <rect x="51" y="0" width="2" height="20" />
                      <rect x="54" y="0" width="1" height="20" />
                      <rect x="56" y="0" width="4" height="20" />
                      <rect x="61" y="0" width="1" height="20" />
                      <rect x="63" y="0" width="2" height="20" />
                      <rect x="66" y="0" width="3" height="20" />
                      <rect x="70" y="0" width="1" height="20" />
                      <rect x="72" y="0" width="2" height="20" />
                      <rect x="75" y="0" width="4" height="20" />
                      <rect x="80" y="0" width="1" height="20" />
                      <rect x="82" y="0" width="2" height="20" />
                      <rect x="85" y="0" width="3" height="20" />
                      <rect x="89" y="0" width="1" height="20" />
                      <rect x="91" y="0" width="2" height="20" />
                      <rect x="94" y="0" width="1" height="20" />
                      <rect x="96" y="0" width="4" height="20" />
                    </svg>
                    <span className="text-[7px] text-gray-500 tracking-[0.3em] font-mono">
                      * {memberId} *
                    </span>
                  </div>
                </motion.div>

                {/* Explanation text */}
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  🎉 Welcome to the club! Take a screenshot of this digital card. Present it at the Connaught Place store to receive priority services and claim your cashbacks.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsAppRegister}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <FaWhatsapp className="w-4.5 h-4.5" />
                    <span>Send ID to WhatsApp Database</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-xs transition-colors border border-gray-800 cursor-pointer"
                  >
                    Dismiss & Continue
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VipModal;
