import React, { useEffect, useRef } from 'react';
import '../styles/FlightDetailModal.css';
import { useTheme } from '../contexts/ThemeContext';

const FlightDetailModal = ({ flight, view, onClose }) => {
  const { theme } = useTheme();
  const modalRef = useRef(null);
  
  // Handle closing the modal with escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  // Close when clicking outside the modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  
  // Focus trap for accessibility
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  // Mock data for flight details
  const flightDetails = {
    aircraft: 'Boeing 777-300ER',
    scheduledDeparture: '10:00',
    estimatedDeparture: flight.status === 'Delayed' ? '10:45' : '10:00',
    distance: '3,450 miles',
    duration: '7h 15m',
    baggage: flight.status === 'Boarding' ? 'Claim 5' : 'Loading',
    weather: {
      destination: {
        temp: '72°F',
        condition: 'Partly Cloudy',
      }
    }
  };
  
  const locationKey = view === 'departures' ? 'destination' : 'origin';

  return (
    <div className={`modal-overlay ${theme}`}>
      <div 
        className={`flight-detail-modal ${theme}`} 
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        
        <div className="modal-header">
          <div className="flight-badge">{flight.flightNumber}</div>
          <h2 id="modal-title">{flight.airline} Flight Details</h2>
          <div className={`status-badge ${flight.status.toLowerCase().replace(' ', '-')}`}>
            {flight.status}
          </div>
        </div>
        
        <div className="flight-route">
          {view === 'departures' ? (
            <div className="route-display">
              <div className="airport">
                <div className="airport-code">Local</div>
                <div className="terminal-gate">
                  Terminal {flight.terminal}, Gate {flight.gate}
                </div>
              </div>
              <div className="route-arrow">➔</div>
              <div className="airport">
                <div className="airport-code">{flight.destination}</div>
                <div className="weather-info">
                  {flightDetails.weather.destination.temp}, {flightDetails.weather.destination.condition}
                </div>
              </div>
            </div>
          ) : (
            <div className="route-display">
              <div className="airport">
                <div className="airport-code">{flight.origin}</div>
                <div className="weather-info">
                  {flightDetails.weather.destination.temp}, {flightDetails.weather.destination.condition}
                </div>
              </div>
              <div className="route-arrow">➔</div>
              <div className="airport">
                <div className="airport-code">Local</div>
                <div className="terminal-gate">
                  Terminal {flight.terminal}, Gate {flight.gate}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flight-details">
          <div className="detail-group">
            <div className="detail-item">
              <span className="detail-label">Aircraft</span>
              <span className="detail-value">{flightDetails.aircraft}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Scheduled</span>
              <span className="detail-value">{flightDetails.scheduledDeparture}</span>
            </div>
            {flight.status === 'Delayed' && (
              <div className="detail-item">
                <span className="detail-label">Estimated</span>
                <span className="detail-value delay">{flightDetails.estimatedDeparture}</span>
              </div>
            )}
          </div>
          
          <div className="detail-group">
            <div className="detail-item">
              <span className="detail-label">Distance</span>
              <span className="detail-value">{flightDetails.distance}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{flightDetails.duration}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Baggage</span>
              <span className="detail-value">{flightDetails.baggage}</span>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="action-btn primary">Track This Flight</button>
          <button className="action-btn secondary">Set Alerts</button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailModal;
