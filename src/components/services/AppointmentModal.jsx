import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiCalendar, FiClock } from 'react-icons/fi';

const AppointmentModal = ({ isOpen, onClose, defaultService = "" }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: defaultService || "Eye Checkup",
    },
  });

  if (!isOpen) return null;

  const onSubmitForm = (data) => {
    setSubmitting(true);
    // Simulate API request (e.g. EmailJS or backend API)
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      reset();
    }, 1500);
  };

  const closeAndReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={closeAndReset}
          className="fixed inset-0 bg-black"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative z-10 shadow-2xl font-sans"
        >
          {/* Close button */}
          <button
            onClick={closeAndReset}
            className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white p-2 rounded-full cursor-pointer"
            aria-label="Close booking modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-black text-royal-blue dark:text-premium-gold tracking-tight font-serif">
                  Book an Appointment
                </h2>
                <p className="text-xs text-secondary-text dark:text-gray-400 mt-1">
                  Schedule your free eye test or premium frame consultation with our retail specialists.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName", { required: "Name is required" })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all dark:bg-gray-800 dark:text-white ${
                      errors.fullName
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                    }`}
                  />
                  {errors.fullName && <span className="text-[11px] text-red-500 mt-0.5">{errors.fullName.message}</span>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (123) 456-7890"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[+]?[0-9\s-()]{7,15}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all dark:bg-gray-800 dark:text-white ${
                      errors.phone
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                    }`}
                  />
                  {errors.phone && <span className="text-[11px] text-red-500 mt-0.5">{errors.phone.message}</span>}
                </div>

                {/* Grid Date & Time Slot */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <FiCalendar className="mr-1 text-premium-gold" /> Date *
                    </label>
                    <input
                      type="date"
                      {...register("date", { required: "Date is required" })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all dark:bg-gray-800 dark:text-white ${
                        errors.date
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 dark:border-gray-800 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
                      }`}
                    />
                    {errors.date && <span className="text-[11px] text-red-500 mt-0.5">{errors.date.message}</span>}
                  </div>

                  {/* Time Slot */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <FiClock className="mr-1 text-premium-gold" /> Slot *
                    </label>
                    <select
                      {...register("slot", { required: "Slot is required" })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold dark:bg-gray-800 dark:text-white"
                    >
                      <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="evening">Evening (5:00 PM - 9:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Required Service</label>
                  <select
                    {...register("service")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Free Eye Checkup">Free Eye Checkup (Computerized Refraction)</option>
                    <option value="Computer Vision Testing">Computer Vision Testing</option>
                    <option value="Frame Adjustment">Frame Adjustment & Polish</option>
                    <option value="Contact Lens Consultation">Contact Lens Consultation</option>
                    <option value="Sunglass Fitting">Custom Sunglass Fitting</option>
                  </select>
                </div>

                {/* Special Instructions */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Special Notes (Optional)</label>
                  <textarea
                    rows="2"
                    placeholder="Let us know any eye conditions, lens requests, or frame interests..."
                    {...register("notes")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold dark:bg-gray-800 dark:text-white resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-royal-blue dark:bg-gray-800 hover:bg-premium-gold hover:text-royal-blue dark:hover:bg-premium-gold dark:border dark:border-premium-gold dark:text-white dark:hover:text-royal-blue py-3 rounded-2xl font-bold transition-all duration-300 shadow cursor-pointer disabled:opacity-50 text-sm"
                  id="appointment-submit-button"
                >
                  {submitting ? 'Confirming Slots...' : 'Confirm Appointment'}
                </button>
              </form>
            </div>
          ) : (
            /* Success View */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h3 className="text-2xl font-black text-royal-blue dark:text-premium-gold font-serif">
                Appointment Requested!
              </h3>
              <p className="text-sm text-secondary-text dark:text-gray-300 font-sans max-w-sm">
                Thank you. We have saved your preferred slots. A retail optometrist from **Optic World** will SMS/Call you within 2 hours to confirm your booking.
              </p>
              <button
                onClick={closeAndReset}
                className="bg-royal-blue text-white px-6 py-2.5 rounded-xl font-bold hover:bg-premium-gold hover:text-royal-blue transition-colors duration-300 cursor-pointer text-sm"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
