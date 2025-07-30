import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';
import { useTheme } from '../contexts/ThemeContext';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  // Add debounce functionality for search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setIsExpanded(false);
    }
  };

  return (
    <div className={`search-container ${theme} ${isExpanded ? 'expanded' : ''}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search flight, destination, airline..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search flights"
        />
        {searchTerm && (
          <button 
            className="clear-button" 
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            ×
          </button>
        )}
        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      {searchTerm && (
        <div className="search-hint">
          Searching for: <span className="search-term">{searchTerm}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
