// Simulated flight data service with delay to mimic API calls
const mockFlights = {
  departures: [
    { id: 1, time: '08:15', flightNumber: 'BA2490', destination: 'New York', status: 'On Time', terminal: '5', gate: 'A22', airline: 'British Airways' },
    { id: 2, time: '09:30', flightNumber: 'LH1010', destination: 'Berlin', status: 'Boarding', terminal: '2', gate: 'B15', airline: 'Lufthansa' },
    { id: 3, time: '10:45', flightNumber: 'AF1680', destination: 'Paris', status: 'Delayed', terminal: '4', gate: 'C10', airline: 'Air France' },
    { id: 4, time: '11:20', flightNumber: 'EK031', destination: 'Dubai', status: 'On Time', terminal: '3', gate: 'D25', airline: 'Emirates' },
    { id: 5, time: '12:00', flightNumber: 'QR183', destination: 'Doha', status: 'Gate Closed', terminal: '1', gate: 'E12', airline: 'Qatar Airways' },
    { id: 6, time: '13:15', flightNumber: 'SQ321', destination: 'Singapore', status: 'On Time', terminal: '2', gate: 'F08', airline: 'Singapore Airlines' },
    { id: 7, time: '14:30', flightNumber: 'UA988', destination: 'Chicago', status: 'Delayed', terminal: '3', gate: 'G17', airline: 'United Airlines' },
    { id: 8, time: '15:45', flightNumber: 'DL216', destination: 'Atlanta', status: 'On Time', terminal: '4', gate: 'H22', airline: 'Delta Air Lines' }
  ],
  arrivals: [
    { id: 101, time: '08:00', flightNumber: 'LX318', origin: 'Zurich', status: 'Landed', terminal: '2', gate: 'B10', airline: 'Swiss' },
    { id: 102, time: '09:15', flightNumber: 'IB3166', origin: 'Madrid', status: 'On Time', terminal: '5', gate: 'A15', airline: 'Iberia' },
    { id: 103, time: '10:30', flightNumber: 'TK1980', origin: 'Istanbul', status: 'Delayed', terminal: '2', gate: 'C22', airline: 'Turkish Airlines' },
    { id: 104, time: '11:45', flightNumber: 'CX250', origin: 'Hong Kong', status: 'On Time', terminal: '3', gate: 'D08', airline: 'Cathay Pacific' },
    { id: 105, time: '12:30', flightNumber: 'JL043', origin: 'Tokyo', status: 'Arrived', terminal: '4', gate: 'E17', airline: 'Japan Airlines' },
    { id: 106, time: '13:40', flightNumber: 'EY019', origin: 'Abu Dhabi', status: 'On Time', terminal: '1', gate: 'F12', airline: 'Etihad Airways' },
    { id: 107, time: '14:15', flightNumber: 'AY1332', origin: 'Helsinki', status: 'Delayed', terminal: '5', gate: 'G09', airline: 'Finnair' },
    { id: 108, time: '15:20', flightNumber: 'AC860', origin: 'Toronto', status: 'On Time', terminal: '2', gate: 'H14', airline: 'Air Canada' }
  ]
};

// Add some randomness to flight status updates
const updateFlightStatuses = (flights) => {
  return flights.map(flight => {
    // Randomly update some flight statuses
    if (Math.random() > 0.8) {
      const statuses = ['On Time', 'Delayed', 'Boarding', 'Final Call', 'Gate Closed'];
      flight = { ...flight, status: statuses[Math.floor(Math.random() * statuses.length)] };
    }
    return flight;
  });
};

export const getFlights = async (type = 'departures') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Randomly fail to simulate network errors (uncomment for testing error handling)
  // if (Math.random() > 0.95) throw new Error("Network error");
  
  const flights = type === 'departures' ? mockFlights.departures : mockFlights.arrivals;
  return updateFlightStatuses([...flights]);
};

// For a real implementation, you would use fetch() to call your backend API
// export const getFlights = async (type = 'departures') => {
//   try {
//     const response = await fetch(`/api/flights/${type}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch flights');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching flights:', error);
//     throw error;
//   }
// };
