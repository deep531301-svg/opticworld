import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex py-3 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-sans" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors duration-200"
          >
            <FiHome className="mr-2 w-3.5 h-3.5" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <FiChevronRight className="text-gray-400 w-4 h-4 mx-1" />
              {isLast ? (
                <span className="text-premium-gold dark:text-premium-gold font-medium truncate max-w-[120px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
