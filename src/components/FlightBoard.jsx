import React, { useState, useEffect } from 'react';
import FlightRow from './FlightRow';
import SearchBar from './SearchBar';
import FlightBoardHeader from './FlightBoardHeader';
import { getFlights } from '../services/flightService';
import '../styles/FlightBoard.css';
import { useTheme } from '../contexts/ThemeContext';
import FlightDetailModal from './FlightDetailModal';
import FilterOptions from './FilterOptions';

const FlightBoard = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('departures'); // 'departures' or 'arrivals'
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'asc' });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    airline: 'all',
    status: 'all',
    terminal: 'all'
  });
  const { theme } = useTheme();

  useEffect(() => {
    const loadFlights = async () => {
      try {
        setIsLoading(true);
        const data = await getFlights(view);
        setFlights(data);
        setFilteredFlights(data);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Unable to load flight information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFlights();
    // Set up periodic updates
    const intervalId = setInterval(loadFlights, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, [view]);

  useEffect(() => {
    // Apply filters and sorting whenever flights or filter/sort options change
    let result = [...flights];
    
    // Apply filters
    if (filterOptions.airline !== 'all') {
      result = result.filter(flight => flight.airline === filterOptions.airline);
    }
    if (filterOptions.status !== 'all') {
      result = result.filter(flight => flight.status === filterOptions.status);
    }
    if (filterOptions.terminal !== 'all') {
      result = result.filter(flight => flight.terminal === filterOptions.terminal);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredFlights(result);
  }, [flights, filterOptions, sortConfig]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredFlights(flights);
      return;
    }
    
    const filtered = flights.filter(flight => 
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredFlights(filtered);
  };

  const toggleView = () => {
    setView(view === 'departures' ? 'arrivals' : 'departures');
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  const handleFilterChange = (filterType, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (error) {
    return <div className={`error-container ${theme}`}>{error}</div>;
  }

  // Extract unique values for filters
  const airlines = [...new Set(flights.map(flight => flight.airline))];
  const statuses = [...new Set(flights.map(flight => flight.status))];
  const terminals = [...new Set(flights.map(flight => flight.terminal))];

  return (
    <div className={`flight-board ${theme}`}>
      <FlightBoardHeader 
        view={view} 
        onViewToggle={toggleView} 
      />
      <div className="board-controls">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions 
          airlines={airlines}
          statuses={statuses}
          terminals={terminals}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
      </div>
      
      <div className="flight-table-container">
        <table className="flight-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('time')} className="sortable-header">
                Time {sortConfig.key === 'time' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('flightNumber')} className="sortable-header">
                Flight {sortConfig.key === 'flightNumber' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort(view === 'departures' ? 'destination' : 'origin')} className="sortable-header">
                {view === 'departures' ? 'Destination' : 'Origin'} 
                {sortConfig.key === (view === 'departures' ? 'destination' : 'origin') && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable-header">
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('terminal')} className="sortable-header">
                Terminal {sortConfig.key === 'terminal' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('gate')} className="sortable-header">
                Gate {sortConfig.key === 'gate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="loading-cell">
                  <div className="loading-spinner"></div>
                  <p>Loading flight information...</p>
                </td>
              </tr>
            ) : filteredFlights.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">No flights found</td>
              </tr>
            ) : (
              filteredFlights.map(flight => (
                <FlightRow 
                  key={flight.id} 
                  flight={flight} 
                  view={view}
                  onClick={() => handleFlightSelect(flight)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedFlight && (
        <FlightDetailModal 
          flight={selectedFlight} 
          view={view}
          onClose={() => setSelectedFlight(null)} 
        />
      )}
    </div>
  );
};

export default FlightBoard;
