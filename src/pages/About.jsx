import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiEye, FiSearch, FiCheckCircle } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';

const About = () => {
  const breadcrumbItems = [{ label: 'About Us', path: '/about' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <Helmet>
        <title>About Us & Our Founders | Optic World & MEHAKAANA</title>
        <meta name="description" content="Discover the story of Optic World and MEHAKAANA, Ludhiana's luxury optical showroom and bespoke perfumery founded by Harvinder Singh and Jaspreet Singh." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Our Legacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-primary-text dark:text-white leading-tight">
            See Better. Look Better. Smell Better.
          </h1>
          <div className="w-16 h-1 bg-premium-gold rounded-full"></div>
          <p className="text-sm text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
            Established in 2011, **Optic World** began with a simple yet groundbreaking philosophy: eyewear should not just help you see better; it should help you look your absolute best. Over the last decade, we expanded our luxury optical showroom to include a rare fragrance boutique under our signature brand **MEHAKAANA**—bridging high-end visual diagnostics with premium French perfumes and imported Arabian Attars.
          </p>
          <p className="text-sm text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
            We believe that confidence is sensory. It is the clarity with which you view the world, the design statement of your frames, and the alluring scent you leave behind. Today, we are proud to serve over 50,000 customers who trust us for accuracy, luxury, and unmatched retail curation powered by Optic World & MEHAKAANA.
          </p>
        </div>

        {/* Brand Collage */}
        <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-950">
          <img
            src="https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=1000"
            alt="Optic World Luxury Showroom Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-premium-gold/30 p-6 rounded-2xl flex justify-between text-center divide-x divide-gray-200 dark:divide-gray-800">
            <div className="flex-1">
              <span className="block text-2xl font-black text-royal-blue dark:text-premium-gold font-sans">15+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-sans">Years Exp</span>
            </div>
            <div className="flex-1">
              <span className="block text-2xl font-black text-royal-blue dark:text-premium-gold font-sans">50k+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-sans">Customers</span>
            </div>
            <div className="flex-1">
              <span className="block text-2xl font-black text-royal-blue dark:text-premium-gold font-sans">100%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-sans">Purity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm space-y-4 hover:shadow-lg transition-all duration-300">
          <div className="p-3.5 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
            <FiEye className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-primary-text dark:text-white">Our Mission</h3>
          <p className="text-sm text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
            To provide precise visual solutions and unmatched aesthetic confidence by combining high-quality medical lens checkups, designer frame catalogs, and premium fragrance sensory curation. We focus on elevating how our clients see and present themselves to the world.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm space-y-4 hover:shadow-lg transition-all duration-300">
          <div className="p-3.5 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
            <FiAward className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-primary-text dark:text-white">Our Vision</h3>
          <p className="text-sm text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
            To be recognized as the leading premium lifestyle optical and fragrance showroom, setting industry benchmarks for computerized diagnostic accuracy, authentic multi-brand designer sourcing, and personalized retail consultations.
          </p>
        </div>
      </section>

      {/* Leadership / Founders Section */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            The Visionaries
          </span>
          <h2 className="text-3xl font-black text-primary-text dark:text-white tracking-tight font-serif">
            Behind Optic World & MEHAKAANA
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Owner 1 */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
              alt="Harvinder Singh - Founder"
              className="w-28 h-28 object-cover rounded-2xl shadow border border-gray-200 dark:border-gray-800 shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div>
                <h3 className="text-lg font-bold text-primary-text dark:text-white m-0 font-serif">Harvinder Singh</h3>
                <span className="text-[10px] text-premium-gold font-bold uppercase tracking-wider block mt-0.5 font-sans">Founder & Chief Optometrist</span>
              </div>
              <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
                With over 25 years of optical consulting experience, Harvinder established Optic World to bridge clinical diagnostic precision with luxury designer eyewear. He hand-selects every frame line in the showroom.
              </p>
            </div>
          </div>

          {/* Owner 2 */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
              alt="Jaspreet Singh - Co-Founder"
              className="w-28 h-28 object-cover rounded-2xl shadow border border-gray-200 dark:border-gray-800 shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div>
                <h3 className="text-lg font-bold text-primary-text dark:text-white m-0 font-serif">Jaspreet Singh</h3>
                <span className="text-[10px] text-premium-gold font-bold uppercase tracking-wider block mt-0.5 font-sans">Co-Founder & Lead Scent Alchemist</span>
              </div>
              <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
                A master of premium fragrance compounding, Jaspreet oversees the MEHAKAANA lab. Trained in Grasse and Dubai, he personally curates the pure Cambodian Oud distillations and oil blends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="bg-gray-50 dark:bg-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Our Standards
          </span>
          <h2 className="text-3xl font-black text-primary-text dark:text-white tracking-tight">
            The Optic World Guarantee
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">Authentic Sourcing</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">We source directly from Luxottica (Ray-Ban, Oakley) and fragrance distributors in Grasse & Dubai.</p>
            </div>
          </div>
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">High Index Lenses</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">Precision diagnostics ensure exact visual corrections across thin, light, high-index lenses.</p>
            </div>
          </div>
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">100% MEHAKAANA Purity</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">Our signature Arabian Attars contain no synthetic carrier oils, mineral oil, or alcohol dilutions.</p>
            </div>
          </div>
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">Complimentary Fitment Tuning</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">Frames purchased receive lifetime ultrasonic bath cleanings and temple adjustments.</p>
            </div>
          </div>
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">Vision Protection Warranty</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">All premium lens coatings (blue light, anti-reflective) are covered by a 1-year guarantee.</p>
            </div>
          </div>
          <div className="flex space-x-3 items-start">
            <FiCheckCircle className="text-premium-gold w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary-text dark:text-white text-sm">Optician Consultation</h4>
              <p className="text-xs text-secondary-text dark:text-gray-400 mt-1 leading-relaxed">Personalized consultations to pair frames matching your facial geometry and style.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
