import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { offers as initialOffers } from '../data/testimonials';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('917880009292');
  const [ordersCount, setOrdersCount] = useState(0);

  // Initialize data on mount
  useEffect(() => {
    // 1. Products loading
    const savedProducts = localStorage.getItem('optic_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem('optic_products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }

    // 2. Coupons/Offers loading
    const savedOffers = localStorage.getItem('optic_offers');
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    } else {
      localStorage.setItem('optic_offers', JSON.stringify(initialOffers));
      setOffers(initialOffers);
    }

    // 3. Business Phone loading
    const savedPhone = localStorage.getItem('optic_phone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    } else {
      localStorage.setItem('optic_phone', '917880009292');
    }

    // 4. Analytics Orders loading
    const savedOrders = localStorage.getItem('optic_orders_count');
    if (savedOrders) {
      setOrdersCount(Number(savedOrders));
    } else {
      localStorage.setItem('optic_orders_count', '0');
    }
  }, []);

  // Sync utilities
  const saveProductsToStorage = (newProducts) => {
    localStorage.setItem('optic_products', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const saveOffersToStorage = (newOffers) => {
    localStorage.setItem('optic_offers', JSON.stringify(newOffers));
    setOffers(newOffers);
  };

  // Product actions
  const addProduct = (product) => {
    const updated = [...products, { ...product, id: product.id || `prod-${Date.now()}` }];
    saveProductsToStorage(updated);
  };

  const updateProduct = (id, fields) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...fields } : p));
    saveProductsToStorage(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProductsToStorage(updated);
  };

  // Coupon actions
  const addCoupon = (coupon) => {
    const updated = [...offers, { ...coupon, id: coupon.id || `coupon-${Date.now()}` }];
    saveOffersToStorage(updated);
  };

  const deleteCoupon = (id) => {
    const updated = offers.filter((o) => o.id !== id);
    saveOffersToStorage(updated);
  };

  // Setting actions
  const updatePhoneNumber = (num) => {
    const cleanNum = num.replace(/\+/g, '').replace(/\s/g, '');
    localStorage.setItem('optic_phone', cleanNum);
    setPhoneNumber(cleanNum);
  };

  const incrementOrdersCount = () => {
    const newCount = ordersCount + 1;
    localStorage.setItem('optic_orders_count', String(newCount));
    setOrdersCount(newCount);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        offers,
        phoneNumber,
        ordersCount,
        addProduct,
        updateProduct,
        deleteProduct,
        addCoupon,
        deleteCoupon,
        updatePhoneNumber,
        incrementOrdersCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
