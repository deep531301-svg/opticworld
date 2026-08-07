import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiClock, FiCheckCircle, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSendMessage = (data) => {
    setLoading(true);
    // Simulate EmailJS execution
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const breadcrumbItems = [{ label: 'Contact', path: '/contact' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <Helmet>
        <title>Contact & Showroom Location | Optic World Delhi</title>
        <meta name="description" content="Visit our Delhi Connaught Place showroom, call us at +91 78800 09292, or send a WhatsApp message to consult our lead optician and fragrance compounders." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase">
          Connect With Our Consultants
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
          Contact Showroom
        </h1>
        <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
      </div>

      {/* Contact Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Information & Hours */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold font-serif text-primary-text dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 m-0">
              Showroom Details
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <FiMapPin className="text-premium-gold w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-primary-text dark:text-white">Store Address</h4>
                  <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">
                    123 Luxury Avenue, Sector 5,<br />
                    Premium Retail Hub, Delhi 110001
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-3.5">
                <FiPhone className="text-premium-gold w-5 h-5 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-primary-text dark:text-white">Phone Support</h4>
                  <p className="text-xs text-secondary-text dark:text-gray-400 mt-0.5">
                    <a href="tel:+917880009292" className="hover:text-premium-gold transition-colors font-semibold">
                      +91 78800 09292
                    </a> (Toll-Free support)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <FiMail className="text-premium-gold w-5 h-5 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-primary-text dark:text-white">Email Address</h4>
                  <p className="text-xs text-secondary-text dark:text-gray-400 mt-0.5">
                    <a href="mailto:info@opticworld.com" className="hover:text-premium-gold transition-colors font-semibold">
                      info@opticworld.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3.5">
                <FiClock className="text-premium-gold w-5 h-5 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-primary-text dark:text-white">Business Hours</h4>
                  <p className="text-xs text-secondary-text dark:text-gray-400 mt-0.5">
                    Monday - Sunday: 10:00 AM - 9:00 PM (IST)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 pt-2 flex-wrap">
              <a
                href="https://wa.me/917880009292?text=Hello%20Optic%20World,%20I%20have%20a%20showroom%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
                <span>WhatsApp Consult</span>
              </a>
              <a
                href="tel:+917880009292"
                className="bg-royal-blue dark:bg-gray-800 text-white border border-premium-gold/30 hover:bg-premium-gold hover:text-royal-blue px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <FiPhone className="w-4 h-4" />
                <span>Call Optician</span>
              </a>
            </div>
          </div>

          {/* Map display */}
          <div className="w-full h-64 rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
            <iframe
              title="Showroom Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.272186835165!2d77.206584!3d28.627702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b6000001%3A0x7d028ef78b31a89c!2sConnaught+Place%2C+New+Delhi%2C+Delhi%2C+India!5e0!3m2!1sen!2sus!4v1542104085461"
              className="w-full h-full border-0 grayscale dark:invert"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Contact Form panel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold font-serif text-primary-text dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 m-0">
              Send Message
            </h3>
            <p className="text-[11px] text-gray-500 mt-1.5">
              Have questions regarding lens materials, custom attar distillations, or group discounts? Write to us directly.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSendMessage)} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none dark:bg-gray-800 dark:text-white transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Email *</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address format",
                  },
                })}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none dark:bg-gray-800 dark:text-white transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                }`}
              />
              {errors.email && <span className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</span>}
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                placeholder="e.g. Eyewear availability, attar catalog query"
                {...register("subject")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Message Body */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Message *</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                {...register("message", { required: "Message content is required" })}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none dark:bg-gray-800 dark:text-white transition-all resize-none ${
                  errors.message
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                }`}
              ></textarea>
              {errors.message && <span className="text-[10px] text-red-500 mt-0.5">{errors.message.message}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-royal-blue dark:bg-gray-800 border border-premium-gold/30 hover:bg-premium-gold hover:text-royal-blue dark:hover:bg-premium-gold dark:hover:text-royal-blue text-white dark:text-premium-gold py-3 rounded-xl font-bold transition-all duration-300 text-xs shadow flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              id="contact-submit-button"
            >
              {loading ? 'Sending message...' : 'Send Message'}
            </button>

            {/* Form Success Indicator */}
            {isSuccess && (
              <div className="flex items-center space-x-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-xs font-sans">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <span>Your message has been sent successfully. We will email you back shortly.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
