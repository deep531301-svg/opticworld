import React, { useState } from 'react';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Showroom Main Hall",
      category: "interior",
      image: "https://images.unsplash.com/photo-1590156221122-c7b3cb3d215b?auto=format&fit=crop&q=80&w=800",
      description: "Our luxury, minimalist showroom main layout designed with glassmorphism partitions."
    },
    {
      id: 2,
      title: "Sunglasses Showcase",
      category: "sunglasses",
      image: "https://images.unsplash.com/photo-1513909894411-7d7e04c28eca?auto=format&fit=crop&q=80&w=800",
      description: "Classic polarized aviators and metal double-bridge sunglasses displays."
    },
    {
      id: 3,
      title: "Showroom Refraction Room",
      category: "optical",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
      description: "Advanced computerized autorefractor eye testing station for precision corrections."
    },
    {
      id: 4,
      title: "Fragrance Compounding Bar",
      category: "perfumes",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      description: "The MEHAKAANA custom blending bar featuring 100% pure Arabian Attars."
    },
    {
      id: 5,
      title: "VIP Consult Desk",
      category: "interior",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      description: "Quiet consultation lounge for bespoke lens diagnostics and private brand viewings."
    },
    {
      id: 6,
      title: "Optical Eyewear Display",
      category: "optical",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800",
      description: "Luxury acetate, titanium, and 24k gold-plated frames on wood backdrops."
    },
    {
      id: 7,
      title: "Designer Sunglasses Corner",
      category: "sunglasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
      description: "Seasonal catalog selections from Ray-Ban, Oakley, and Gucci."
    },
    {
      id: 8,
      title: "MEHAKAANA Perfume Lab",
      category: "perfumes",
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800",
      description: "Imported French extracts, pure Cambodian Oud oil, and crystal bottle inventories."
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const breadcrumbItems = [{ label: 'Gallery', path: '/gallery' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <Helmet>
        <title>Showroom Interiors & Fragrance Bar Gallery | Optic World</title>
        <meta name="description" content="Browse photos of our state-of-the-art diagnostic equipment, frame display galleries, and the MEHAKAANA custom scent blending bar." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
          Store Interiors & Catalog Showcases
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
          Our Showroom Gallery
        </h1>
        <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {['all', 'interior', 'optical', 'sunglasses', 'perfumes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-xs px-4 py-2 rounded-full border uppercase font-bold tracking-wider transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-royal-blue text-white border-royal-blue dark:bg-premium-gold dark:text-royal-blue dark:border-premium-gold'
                : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-premium-gold'
            }`}
          >
            {tab === 'all' ? 'All photos' : tab}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 pt-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(idx)}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <FiZoomIn className="w-6 h-6 text-premium-gold absolute top-4 right-4" />
              <div className="text-white space-y-0.5">
                <span className="text-[10px] text-premium-gold font-bold uppercase tracking-wider font-sans block">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold font-serif leading-tight">{item.title}</h4>
                <p className="text-[10px] text-gray-300 leading-normal line-clamp-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full z-50 transition-colors"
            aria-label="Close Lightbox"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full z-50 transition-all active:scale-95 cursor-pointer"
            aria-label="Previous Image"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Canvas */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative cursor-default" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 animate-fade-in shadow-2xl hover:scale-105 transition-transform duration-300"
            />
            {/* Caption Card */}
            <div className="text-center text-white mt-4 space-y-1">
              <h3 className="text-lg font-bold font-serif">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-xs text-gray-400 max-w-md leading-relaxed">{filteredItems[lightboxIndex].description}</p>
            </div>
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full z-50 transition-all active:scale-95 cursor-pointer"
            aria-label="Next Image"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
