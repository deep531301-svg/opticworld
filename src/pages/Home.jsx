import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiArrowRight, FiCheck, FiShield, FiHeart } from 'react-icons/fi';
import { FaEye, FaAward, FaUserCheck, FaSmile } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useData } from '../context/DataContext';
import { brands } from '../data/brands';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/products/ProductCard';
import QuickView from '../components/products/QuickView';
import AppointmentModal from '../components/services/AppointmentModal';
import MehakaanaPreview from '../components/products/MehakaanaPreview';

const Home = () => {
  const { products } = useData();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isMehakaanaOpen, setIsMehakaanaOpen] = useState(false);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Optic World & MEHAKAANA",
    "image": "https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=1000",
    "url": "http://localhost:5173",
    "telephone": "+917880009292",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ferozepur Road",
      "addressLocality": "Ludhiana",
      "addressRegion": "Punjab",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.627702,
      "longitude": 77.206584
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    }
  };

  // Split featured items
  const featuredGlasses = products.filter(p => p.category === 'optical').slice(0, 3);
  const featuredSunglasses = products.filter(p => p.category === 'sunglasses').slice(0, 3);
  const featuredFragrances = products.filter(p => p.category === 'perfumes' || p.category === 'attar').slice(0, 4);

  const heroSlides = [
    {
      title: "Luxurious Eyewear",
      subtitle: "See with Clarity. Style with Class.",
      description: "Discover designer frames from Gucci, Dior, and Ray-Ban. Match your personality with our precision-fit prescription lenses.",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1600",
      cta: "Explore Eyewear",
      link: "/products?category=optical"
    },
    {
      title: "Royal Arabian Attar",
      subtitle: "Pure Oud, Musk & Rose Distillations.",
      description: "Indulge in 100% alcohol-free concentrated perfume oils. Exotic, rich scents that capture the majestic heritage of the Middle East.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1600",
      cta: "Browse Attars",
      link: "/products?category=attar"
    },
    {
      title: "Haute Couture Perfumes",
      subtitle: "Luxury Scent Profiles For Men & Women.",
      description: "Curated collections from Chanel, Dior, and Jo Malone. Perfect for gift sets or personal signature statements.",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1600",
      cta: "Shop Perfumes",
      link: "/products?category=perfumes"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Helmet>
        <title>Optic World | Premium Eyewear & Fragrance Boutique Ludhiana</title>
        <meta name="description" content="Welcome to Optic World, a premium optical showroom & MEHAKAANA fragrance bar in Ludhiana. Sourcing Ray-Ban, Oakley eyewear & custom perfumes since 2011." />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* 1. HERO SLIDER */}
      <section className="relative w-full h-[70vh] sm:h-[85vh] bg-black">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-full text-white"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">
              {/* Background image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/35 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105"
              />
              {/* Content Panel */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 sm:pb-0 sm:justify-center items-center sm:items-start text-center sm:text-left max-w-7xl mx-auto px-6 sm:px-8 space-y-4 sm:space-y-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-premium-gold font-bold tracking-[0.08em] sm:tracking-[0.2em] text-[10px] sm:text-sm uppercase font-sans"
                >
                  {slide.subtitle}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-6xl font-black font-serif tracking-tight leading-tight max-w-2xl text-white"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xs sm:text-lg text-gray-300 max-w-md sm:max-w-xl font-sans leading-relaxed"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-2 px-2 sm:px-0"
                >
                  <Link
                    to={slide.link}
                    className="bg-premium-gold text-royal-blue border border-premium-gold font-bold px-6 py-3.5 rounded-xl hover:bg-transparent hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-lg font-sans w-full sm:w-auto"
                  >
                    <span>{slide.cta}</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setIsAppointmentOpen(true)}
                    className="bg-transparent border border-white hover:border-premium-gold text-white hover:text-premium-gold font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-sm font-sans w-full sm:w-auto cursor-pointer"
                  >
                    Book Eye Checkup
                  </button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Luxury Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Eyeglasses */}
          <Link
            to="/products?category=optical"
            className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
              alt="Prescription Eyeglasses"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20 space-y-1">
              <span className="text-premium-gold text-[10px] uppercase font-bold tracking-widest font-sans">
                Precision Lenses
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">Prescription Glasses</h3>
              <p className="text-xs text-gray-300 leading-normal font-sans">Custom frames & eye checks</p>
            </div>
          </Link>

          {/* Sunglasses */}
          <Link
            to="/products?category=sunglasses"
            className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1513909894411-7d7e04c28eca?auto=format&fit=crop&q=80&w=800"
              alt="Designer Sunglasses"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20 space-y-1">
              <span className="text-premium-gold text-[10px] uppercase font-bold tracking-widest font-sans">
                High Fashion
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">Sunglasses Collection</h3>
              <p className="text-xs text-gray-300 leading-normal font-sans">UV400 Polarized styling</p>
            </div>
          </Link>

          {/* Fragrances */}
          <Link
            to="/products?category=perfumes"
            className="group relative h-80 sm:col-span-2 lg:col-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
              alt="Premium Attar & Perfumes"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20 space-y-1">
              <span className="text-premium-gold text-[10px] uppercase font-bold tracking-widest font-sans">
                Exotic Essence
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">Attar & Perfumes</h3>
              <p className="text-xs text-gray-300 leading-normal font-sans">Imported Arabian Ouds & French blends</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (TABBED OR SECTIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="space-y-1">
            <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
              Curated Eyewear
            </span>
            <h2 className="text-3xl font-black text-primary-text dark:text-white tracking-tight">
              Featured Eyeglasses
            </h2>
          </div>
          <Link
            to="/products?category=optical"
            className="text-sm font-semibold text-royal-blue dark:text-premium-gold hover:underline flex items-center space-x-1 mt-2 sm:mt-0"
          >
            <span>View All Frames</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGlasses.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="space-y-1">
            <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
              Summer Elegance
            </span>
            <h2 className="text-3xl font-black text-primary-text dark:text-white tracking-tight">
              Premium Sunglasses
            </h2>
          </div>
          <Link
            to="/products?category=sunglasses"
            className="text-sm font-semibold text-royal-blue dark:text-premium-gold hover:underline flex items-center space-x-1 mt-2 sm:mt-0"
          >
            <span>View All Sunglasses</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSunglasses.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. LUXURY FRAGRANCE SECTION (Dual Banner and Grid) */}
      <section className="bg-gradient-to-br from-[#111827] to-[#1F2937] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-premium-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Scent Intro Card */}
          <div className="space-y-6">
            <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
              MEHAKAANA Perfume Boutique
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              Bespoke Scents & Premium Perfumes
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Step into **MEHAKAANA** at Optic World. We are a specialized boutique fragrance house where you can design your own bespoke custom perfumes and shop premium imported Attars. From pure Cambodian Oud wood distillations to high-end designer European Eau de Parfums, we formulate and source scents that define luxury.
            </p>
            <div className="space-y-3 pt-2 font-sans text-sm">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-premium-gold/20 text-premium-gold rounded-full">
                  <FiCheck className="w-4 h-4" />
                </div>
                <span>Custom Scent Blending at Our Bar</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-premium-gold/20 text-premium-gold rounded-full">
                  <FiCheck className="w-4 h-4" />
                </div>
                <span>100% Alcohol-Free Pure Perfume Oils</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-premium-gold/20 text-premium-gold rounded-full">
                  <FiCheck className="w-4 h-4" />
                </div>
                <span>Long-Lasting (Up to 36 Hours Scent Trail)</span>
              </div>
            </div>
            <button
              onClick={() => setIsMehakaanaOpen(true)}
              className="inline-flex bg-premium-gold text-royal-blue border border-premium-gold font-bold px-6 py-3 rounded-xl hover:bg-transparent hover:text-white transition-all duration-300 items-center space-x-2 text-sm pt-2.5 font-sans cursor-pointer"
            >
              <span>Explore MEHAKAANA</span>
              <FiArrowRight />
            </button>
          </div>

          {/* Fragrance Products Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredFragrances.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Our Quality Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight">
            Why Choose Optic World?
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="p-4 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
              <FaEye className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-primary-text dark:text-white font-serif">Certified Optometrists</h3>
            <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
              Our clinical testing is led by certified, experienced optometrists using computerized vision scanning.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="p-4 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
              <FaAward className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-primary-text dark:text-white font-serif">Premium Brands</h3>
            <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
              We house authorized catalogs of Ray-Ban, Oakley, Gucci, Chanel, and Jo Malone under one roof.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="p-4 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
              <FiShield className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-primary-text dark:text-white font-serif">100% Purity Guarantee</h3>
            <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
              All our Arabian Attars are guaranteed chemical-free, dilution-free, and 100% alcohol-free oil concentrates.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="p-4 bg-royal-blue/5 dark:bg-premium-gold/5 text-premium-gold inline-flex rounded-full">
              <FaSmile className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-primary-text dark:text-white font-serif">Lifetime Adjustment</h3>
            <p className="text-xs text-secondary-text dark:text-gray-400 font-sans leading-relaxed">
              Enjoy lifetime complimentary ultrasonic cleaning and fitting adjustments for any frames bought from us.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BRANDS CAROUSEL */}
      <section className="bg-white dark:bg-gray-950 py-12 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-gray-400 text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Authorized Retailer of Global Brands
          </span>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            className="flex items-center"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id} className="flex justify-center items-center py-4">
                <span className="text-xl sm:text-2xl font-black font-serif tracking-widest text-gray-450 dark:text-gray-650 hover:text-premium-gold dark:hover:text-premium-gold transition-colors duration-300 cursor-pointer select-none">
                  {brand.logoText}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Animated Slider) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
            Loved by Our Customers
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
        </div>

        <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border border-gray-150 dark:border-premium-gold/20 rounded-3xl p-8 sm:p-14 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          {/* Glowing decorative blur circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-royal-blue/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-premium-gold/5 rounded-full blur-2xl pointer-events-none"></div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12 text-center"
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test.id} className="space-y-6 pb-6 flex flex-col items-center">
                {/* Large Elegant Gold Quote Icon */}
                <div className="text-5xl font-serif text-premium-gold/30 font-black leading-none pointer-events-none select-none">
                  “
                </div>

                <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 font-serif leading-relaxed max-w-2xl mx-auto">
                  {test.text}
                </p>

                {/* Star Ratings */}
                <div className="flex justify-center space-x-1 text-premium-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="flex flex-col items-center space-y-3 pt-2">
                  {/* Portrait Avatar with Premium Gold/Blue Rings */}
                  <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-premium-gold via-royal-blue to-premium-gold shadow-md">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-white dark:border-gray-900"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-950 dark:text-white font-sans">{test.name}</h4>
                    <p className="text-[10px] text-premium-gold uppercase tracking-wider font-semibold font-sans mt-0.5">{test.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Interior Elegance
          </span>
          <h2 className="text-3xl font-black text-primary-text dark:text-white tracking-tight">
            Our Showroom Gallery
          </h2>
          <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative">
            <img
              src="https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=400"
              alt="Lens Fitting Section"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider font-sans">
              Lens Section
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative">
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400"
              alt="Optical frames collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider font-sans">
              Optical Display
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400"
              alt="Sunglasses section"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider font-sans">
              Sunglasses Display
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400"
              alt="Perfume counter display"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider font-sans">
              Fragrance Bar
            </div>
          </div>
        </div>

        <Link
          to="/gallery"
          className="inline-flex items-center space-x-2 bg-royal-blue text-white hover:bg-premium-gold hover:text-royal-blue px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 font-sans border border-premium-gold/30"
        >
          <span>View Full Gallery</span>
          <FiArrowRight />
        </Link>
      </section>

      {/* 9. GOOGLE MAP SECTION */}
      <section className="w-full h-96 relative border-t-2 border-premium-gold/20">
        <iframe
          title="Optic World Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.084700778792!2d75.8021677!3d30.8842603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a824e4d77759d%3A0xb35a4d33454746f3!2sFerozepur%20Rd%2C%20Ludhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000"
          className="w-full h-full border-0 grayscale dark:invert"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* RENDER DYNAMIC MODALS */}
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isAppointmentOpen && (
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}

      {isMehakaanaOpen && (
        <MehakaanaPreview
          isOpen={isMehakaanaOpen}
          onClose={() => {
            setIsMehakaanaOpen(false);
            navigate('/products?category=perfumes');
          }}
        />
      )}
    </div>
  );
};

export default Home;
