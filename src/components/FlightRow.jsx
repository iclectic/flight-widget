import React from 'react';
import '../styles/FlightRow.css';
import { useTheme } from '../contexts/ThemeContext';

const FlightRow = ({ flight, view, onClick }) => {
  const { theme } = useTheme();
  
  // Get appropriate status class for styling
  const getStatusClass = (status) => {
    status = status.toLowerCase();
    if (status.includes('on time')) return 'status-on-time';
    if (status.includes('delayed')) return 'status-delayed';
    if (status.includes('boarding')) return 'status-boarding';
    if (status.includes('final call') || status.includes('gate closed')) return 'status-final-call';
    if (status.includes('landed') || status.includes('arrived')) return 'status-landed';
    return '';
  };

  // Format time to be more readable
  const formatTime = (timeString) => {
    // Convert 24-hour format to 12-hour with AM/PM if needed
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const locationKey = view === 'departures' ? 'destination' : 'origin';
  
  return (
    <tr 
      className={`flight-row ${theme}`} 
      onClick={onClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      <td className="flight-time">{formatTime(flight.time)}</td>
      <td className="flight-number">
        <div className="airline-logo-container">
          <span className="airline-code">{flight.flightNumber.substring(0, 2)}</span>
          <span className="flight-number-digits">{flight.flightNumber.substring(2)}</span>
        </div>
        <div className="airline-name">{flight.airline}</div>
      </td>
      <td className="flight-location">{flight[locationKey]}</td>
      <td className={`flight-status ${getStatusClass(flight.status)}`}>{flight.status}</td>
      <td className="flight-terminal">{flight.terminal}</td>
      <td className="flight-gate">{flight.gate}</td>
    </tr>
  );
};

export default FlightRow;
