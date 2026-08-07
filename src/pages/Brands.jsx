import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';
import { brands } from '../data/brands';

const Brands = () => {
  const breadcrumbItems = [{ label: 'Brands', path: '/brands' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <Helmet>
        <title>Authorized Dealer of Luxury Brands | Optic World</title>
        <meta name="description" content="View our authorized collections of Ray-Ban, Oakley, Gucci, Chanel, Jo Malone, and other leading global eyewear and fragrance brands." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-premium-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
          Authorized Catalogs
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary-text dark:text-white tracking-tight font-serif">
          Our Premium Brands
        </h1>
        <p className="text-xs text-secondary-text dark:text-gray-400 max-w-md mx-auto">
          We deal exclusively with licensed global designers to bring you genuine craftsmanship and authentic luxury.
        </p>
        <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full mt-2"></div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
          >
            {/* Image section */}
            <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-gray-50 dark:bg-gray-950 min-h-[160px]">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-2xl font-black font-serif tracking-wider text-white select-none">
                  {brand.logoText}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-primary-text dark:text-white font-serif">
                    {brand.name}
                  </h3>
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded uppercase font-semibold">
                    {brand.origin}
                  </span>
                </div>
                <p className="text-xs text-premium-gold font-bold italic tracking-wide">
                  "{brand.tagline}"
                </p>
                <p className="text-xs text-secondary-text dark:text-gray-400 leading-relaxed">
                  Experience {brand.name}'s legendary collections including {brand.specialty.toLowerCase()}.
                </p>
                <ul className="text-[10px] text-gray-500 dark:text-gray-400 space-y-1 pt-1">
                  <li className="flex items-center space-x-1.5">
                    <FiCheck className="text-emerald-500" />
                    <span>Official Manufacturer Warranty Included</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <FiCheck className="text-emerald-500" />
                    <span>Complimentary Case & Certificate of Authenticity</span>
                  </li>
                </ul>
              </div>

              {/* View products link */}
              <Link
                to={`/products?brand=${brand.name}`}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-royal-blue dark:text-premium-gold hover:underline group"
              >
                <span>Browse {brand.name} Catalog</span>
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
