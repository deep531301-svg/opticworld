import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {/* Premium elegant golden loading rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-premium-gold border-r-transparent border-b-royal-blue border-l-transparent animate-spin duration-1000"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-premium-gold border-b-transparent border-l-royal-blue animate-spin duration-700 reverse-spin"></div>
      </div>
      <p className="font-serif italic tracking-widest text-premium-gold text-sm animate-pulse">
        Optic World
      </p>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 space-y-4 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-800 aspect-square rounded-lg w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-8"></div>
      </div>
    </div>
  );
};
