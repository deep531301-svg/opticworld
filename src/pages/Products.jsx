import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiX, FiCheck } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductCard from '../components/products/ProductCard';
import QuickView from '../components/products/QuickView';
import { useData } from '../context/DataContext';

const Products = () => {
  const { products } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [priceRange, setPriceRange] = useState(40000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync category & brand state with search parameters from other pages
  useEffect(() => {
    const cat = searchParams.get('category');
    const br = searchParams.get('brand');
    if (cat) {
      setSelectedCategory(cat);
      setSelectedSubcategory('all');
    } else {
      setSelectedCategory('all');
    }
    if (br) {
      setSelectedBrand(br);
    } else {
      setSelectedBrand('all');
    }
  }, [searchParams]);

  // Extract unique brands for filtering
  const uniqueBrands = useMemo(() => {
    return ['all', ...new Set(products.map((p) => p.brand))];
  }, []);

  // Map categories to human titles
  const categoriesList = [
    { value: 'all', label: 'All Products' },
    { value: 'optical', label: 'Optical (Glasses)' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'contact-lenses', label: 'Contact Lenses' },
    { value: 'attar', label: 'Imported Attar' },
    { value: 'perfumes', label: 'Luxury Perfumes' },
  ];

  // Get dynamic subcategories list based on selected category
  const subcategoriesList = useMemo(() => {
    if (selectedCategory === 'all') return ['all'];
    const filtered = products.filter((p) => p.category === selectedCategory);
    return ['all', ...new Set(filtered.map((p) => p.subcategory).filter(Boolean))];
  }, [selectedCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Term Match
        const matchesSearch =
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(search.toLowerCase()));

        // Category Match
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;

        // Subcategory Match
        const matchesSubcategory =
          selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;

        // Brand Match
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

        // Price Match
        const matchesPrice = Number(product.price) <= priceRange;

        // Rating Match
        const matchesRating = Number(product.rating) >= minRating;

        return (
          matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesPrice && matchesRating
        );
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default
      });
  }, [search, selectedCategory, selectedSubcategory, selectedBrand, priceRange, minRating, sortBy]);

  const handleCategoryChange = (catVal) => {
    setSelectedCategory(catVal);
    setSelectedSubcategory('all');
    setSearchParams({ category: catVal });
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setPriceRange(40000);
    setMinRating(0);
    setSortBy('default');
    setSearchParams({});
  };

  const breadcrumbItems = [{ label: 'Products', path: '/products' }];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <Helmet>
        <title>Shop Eyewear, Sunglasses & Premium Perfumes | Optic World</title>
        <meta name="description" content="Browse our luxury collection of designer sunglasses, optical frames, imported Attars, and custom compounded perfume impressions at Optic World." />
      </Helmet>

      <Breadcrumb items={breadcrumbItems} />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-text dark:text-white font-serif tracking-tight m-0">
            Optic World Collections
          </h1>
          <p className="text-xs text-secondary-text dark:text-gray-400 mt-1">
            Displaying {filteredProducts.length} luxurious items matching your specifications.
          </p>
        </div>

        {/* Sort and Filters toggle */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-premium-gold"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center space-x-1.5 px-4 py-2 bg-royal-blue text-white dark:bg-gray-800 border border-premium-gold/30 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <FiSliders className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex gap-8 items-start">
        {/* SIDEBAR FILTERS (Visible on Desktop / lg+) */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl space-y-6 shadow-sm">
          {/* Search bar */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">
              Product Search
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-premium-gold dark:text-white"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Categories Radio */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">
              Shop Categories
            </h4>
            <div className="flex flex-col space-y-1.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-royal-blue/10 dark:bg-premium-gold/10 text-royal-blue dark:text-premium-gold font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (Dynamic) */}
          {subcategoriesList.length > 0 && (
            <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">
                Collection Filter
              </h4>
              <div className="flex flex-col space-y-1">
                {subcategoriesList.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-lg capitalize font-medium transition-all ${
                      selectedSubcategory === sub
                        ? 'bg-royal-blue/10 dark:bg-premium-gold/10 text-royal-blue dark:text-premium-gold font-bold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {sub === 'all' ? 'All Styles' : sub.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand Selection */}
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">
              Premium Brands
            </h4>
            <div className="flex flex-col space-y-1">
              {uniqueBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-all ${
                    selectedBrand === brand
                      ? 'bg-royal-blue/10 dark:bg-premium-gold/10 text-royal-blue dark:text-premium-gold font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="uppercase tracking-wider text-royal-blue dark:text-premium-gold">Max Price</span>
              <span className="text-gray-600 dark:text-premium-gold font-sans">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="40000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-premium-gold cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-sans">
              <span>₹1,000</span>
              <span>₹40,000</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">
              Min Rating
            </h4>
            <div className="flex flex-wrap gap-2">
              {[0, 4.5, 4.7, 4.8, 4.9].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => setMinRating(ratingVal)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all ${
                    minRating === ratingVal
                      ? 'bg-premium-gold border-premium-gold text-royal-blue'
                      : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-500 hover:border-premium-gold'
                  }`}
                >
                  {ratingVal === 0 ? 'All' : `${ratingVal}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearAllFilters}
            className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        {/* PRODUCTS GRID AREA */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4">
              <FiX className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-primary-text dark:text-white font-serif">No Products Found</h3>
              <p className="text-xs text-secondary-text dark:text-gray-400 font-sans max-w-sm mx-auto">
                We couldn't find any premium collections matching your search criteria. Try modifying filters or search query terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-royal-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-premium-gold hover:text-royal-blue transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS SIDE SHEET (Fixed drawer on mobile, open-closed states) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <div className="w-80 bg-white dark:bg-gray-900 h-full overflow-y-auto relative z-10 flex flex-col p-6 shadow-2xl border-l border-gray-100 dark:border-gray-800 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-black text-royal-blue dark:text-premium-gold font-serif">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer"
              >
                <FiX className="w-5 h-5 text-gray-700 dark:text-white" />
              </button>
            </div>

            {/* Mobile Filters Content (Clone of Desktop filters for simplicity) */}
            {/* Search */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold">Search</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search collection..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none dark:text-white"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold font-sans">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-royal-blue text-white border-royal-blue font-bold dark:bg-premium-gold dark:text-royal-blue dark:border-premium-gold'
                        : 'border-gray-200 dark:border-gray-800 text-gray-650 dark:text-gray-450'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories (Dynamic) */}
            {subcategoriesList.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold font-sans">Subcategories</h4>
                <div className="flex flex-wrap gap-2">
                  {subcategoriesList.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`text-xs px-3 py-1.5 rounded-lg border capitalize font-medium transition-all ${
                        selectedSubcategory === sub
                          ? 'bg-royal-blue text-white border-royal-blue font-bold dark:bg-premium-gold dark:text-royal-blue dark:border-premium-gold'
                          : 'border-gray-200 dark:border-gray-800 text-gray-650 dark:text-gray-450'
                      }`}
                    >
                      {sub === 'all' ? 'All Styles' : sub.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold font-sans">Brands</h4>
              <div className="flex flex-wrap gap-2">
                {uniqueBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      selectedBrand === brand
                        ? 'bg-royal-blue text-white border-royal-blue font-bold dark:bg-premium-gold dark:text-royal-blue dark:border-premium-gold'
                        : 'border-gray-200 dark:border-gray-800 text-gray-650 dark:text-gray-450'
                    }`}
                  >
                    {brand === 'all' ? 'All Brands' : brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold font-sans">
                <span className="uppercase tracking-wider text-royal-blue dark:text-premium-gold">Max Price</span>
                <span className="text-gray-600 dark:text-premium-gold font-sans">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="40000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-premium-gold"
              />
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-blue dark:text-premium-gold font-sans">Min Rating</h4>
              <div className="flex flex-wrap gap-2">
                {[0, 4.5, 4.7, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setMinRating(ratingVal)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      minRating === ratingVal
                        ? 'bg-premium-gold border-premium-gold text-royal-blue'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-premium-gold'
                    }`}
                  >
                    {ratingVal === 0 ? 'All' : `${ratingVal}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons inside drawer */}
            <div className="flex space-x-2 pt-4">
              <button
                onClick={clearAllFilters}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-all cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 bg-royal-blue dark:bg-gray-800 border border-premium-gold/30 text-white dark:text-premium-gold py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal Overlay */}
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
