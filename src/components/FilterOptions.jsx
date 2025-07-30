import React, { useState } from 'react';
import '../styles/FilterOptions.css';
import { useTheme } from '../contexts/ThemeContext';

const FilterOptions = ({ airlines, statuses, terminals, filterOptions, onFilterChange }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`filter-options ${theme} ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="filter-toggle" 
        onClick={toggleExpand}
        aria-expanded={isExpanded}
      >
        <span className="filter-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </span>
        Filters {isExpanded ? '▲' : '▼'}
      </button>
      
      {isExpanded && (
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="airline-filter">Airline:</label>
            <select 
              id="airline-filter"
              value={filterOptions.airline}
              onChange={(e) => onFilterChange('airline', e.target.value)}
            >
              <option value="all">All Airlines</option>
              {airlines.map(airline => (
                <option key={airline} value={airline}>
                  {airline}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter"
              value={filterOptions.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="terminal-filter">Terminal:</label>
            <select 
              id="terminal-filter"
              value={filterOptions.terminal}
              onChange={(e) => onFilterChange('terminal', e.target.value)}
            >
              <option value="all">All Terminals</option>
              {terminals.map(terminal => (
                <option key={terminal} value={terminal}>
                  {terminal}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="reset-filters"
            onClick={() => {
              onFilterChange('airline', 'all');
              onFilterChange('status', 'all');
              onFilterChange('terminal', 'all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
