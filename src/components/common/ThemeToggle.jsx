import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 text-primary-text dark:text-white ${className}`}
      aria-label="Toggle theme mode"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-12 text-royal-blue" />
      ) : (
        <FiSun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-45 text-premium-gold" />
      )}
    </button>
  );
};

export default ThemeToggle;
