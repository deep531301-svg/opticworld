import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useData } from '../../context/DataContext';

const FloatingActions = () => {
  const location = useLocation();
  const { phoneNumber: rawNumber } = useData();
  const phoneNumber = `+${rawNumber}`; 
  const whatsappNumber = rawNumber; 
  const locationQuery = "Optic+World+Showroom"; // Mock maps query
  const message = encodeURIComponent("Hello Optic World, I'm interested in booking an eye checkup / checking your collections.");

  if (location.pathname === '/admin') return null;

  return (
    <>
      {/* DESKTOP FLOATING BUTTONS (hidden on mobile bottom, visible md+) */}
      <div className="hidden md:flex flex-col space-y-3 fixed bottom-6 left-6 z-40">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
          title="Chat on WhatsApp"
          id="floating-whatsapp-desktop"
        >
          <FaWhatsapp className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap text-sm font-medium">
            WhatsApp Chat
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="bg-royal-blue dark:bg-gray-800 text-white border border-premium-gold hover:bg-premium-gold hover:text-royal-blue p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
          title="Call Us"
          id="floating-call-desktop"
        >
          <FaPhoneAlt className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap text-sm font-medium">
            Call Showroom
          </span>
        </a>
      </div>

      {/* MOBILE STICKY CONTACT BAR (fixed to bottom on mobile/tablet screen, hidden on md+) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800">
        {/* Call CTA */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex flex-col items-center justify-center py-2.5 text-royal-blue dark:text-white active:bg-gray-100 dark:active:bg-gray-800 transition-colors duration-150"
          id="mobile-nav-call"
        >
          <FaPhoneAlt className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider font-sans">Call Us</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[#25D366] active:bg-gray-100 dark:active:bg-gray-800 transition-colors duration-150"
          id="mobile-nav-whatsapp"
        >
          <FaWhatsapp className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium uppercase tracking-wider font-sans">WhatsApp</span>
        </a>

        {/* Directions CTA */}
        <a
          href={`https://maps.google.com/?q=${locationQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-premium-gold active:bg-gray-100 dark:active:bg-gray-800 transition-colors duration-150"
          id="mobile-nav-directions"
        >
          <FaMapMarkerAlt className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider font-sans">Directions</span>
        </a>
      </div>
    </>
  );
};

export default FloatingActions;
