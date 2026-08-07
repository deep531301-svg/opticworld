import React, { useState } from 'react';
import * as Icons from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';
import AppointmentModal from '../components/services/AppointmentModal';
import FaqAccordion from '../components/common/FaqAccordion';
import { services } from '../data/services';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookService = (title) => {
    setSelectedService(title);
    setIsModalOpen(true);
  };

  const breadcrumbItems = [{ label: 'Services', path: '/services' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <Helmet>
        <title>Computerized Eye Testing & Lens Fitment | Optic World</title>
        <meta name="description" content="Optic World offers expert computerized eye diagnostics, personalized frame consultation, and precision lens fitments. Book your appointment online today." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
          Expert Clinical Solutions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
          Eye Checkups & Consultations
        </h1>
        <p className="text-xs text-secondary-text dark:text-gray-400 max-w-md mx-auto">
          From computerized optical mapping to luxury sunglass customization, our showroom opticians are here to serve.
        </p>
        <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          // Dynamic icon loader from react-icons/fa
          const IconComponent = Icons[service.icon] || Icons.FaRegEye;

          return (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header Icon + Price */}
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold rounded-2xl group-hover:bg-premium-gold group-hover:text-royal-blue transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-royal-blue dark:text-premium-gold font-sans bg-royal-blue/5 dark:bg-premium-gold/15 px-3 py-1 rounded-full border border-royal-blue/10 dark:border-premium-gold/10">
                    {service.price}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary-text dark:text-white font-serif m-0 group-hover:text-premium-gold transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-xs text-secondary-text dark:text-gray-400 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Bullets List */}
                <ul className="space-y-1.5 text-xs text-gray-550 dark:text-gray-400 font-sans border-t border-gray-100 dark:border-gray-800 pt-4">
                  {service.details.map((bullet, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <FiCheck className="text-emerald-500 w-4 h-4 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBookService(service.title)}
                className="w-full bg-royal-blue dark:bg-gray-800 border border-premium-gold/30 hover:bg-premium-gold dark:hover:bg-premium-gold hover:text-royal-blue dark:hover:text-royal-blue text-white dark:text-premium-gold text-xs font-bold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <span>Book Appointment</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <section className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Have Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-primary-text dark:text-white tracking-tight font-serif">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
        </div>
        <FaqAccordion />
      </section>

      {/* Appointment Modal Overlay */}
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultService={selectedService}
        />
      )}
    </div>
  );
};

export default Services;
