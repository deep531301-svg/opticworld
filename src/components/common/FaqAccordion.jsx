import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer free eye checkups?",
      answer: "Yes! We offer completely complimentary computerized vision testing led by certified optometrists at our showroom. You can book a slot online or walk in."
    },
    {
      question: "How long does it take to prepare prescription glasses?",
      answer: "Standard single-vision prescription glasses are usually ready within 1 to 2 hours. High-index or custom progressive lenses may take 2 to 3 business days."
    },
    {
      question: "Are your imported Arabian Attars 100% alcohol-free?",
      answer: "Absolutely. All our imported Attar oils (Oud, Musk, Rose) are 100% pure concentrated oil extracts, completely free from alcohol, chemical carriers, or mineral oil dilutions."
    },
    {
      question: "Do you offer replacement lenses for my existing frames?",
      answer: "Yes, we do. Through our Lens Replacement Service, you can bring in any frame you love, and we will cut and fit new prescription or transition lenses to match."
    },
    {
      question: "Do I get a warranty on premium eyewear?",
      answer: "All luxury designer frames (Ray-Ban, Oakley, Gucci, Dior) come with a 1-year official manufacturer warranty. Premium lens coatings also come with a 1-year scratch guarantee."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 font-sans">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => handleToggle(idx)}
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-sm sm:text-base text-primary-text dark:text-white font-serif">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-premium-gold"
              >
                <FiChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-secondary-text dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
