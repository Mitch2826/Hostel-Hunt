import { createContext, useState, useEffect, useContext } from 'react';
import { mockBookings, mockHostels } from '../mocks/bookingData.jsx';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setBookings(mockBookings);
    setFavorites([1, 3]);
  }, []);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking.id;
  };

  const toggleFavorite = (hostelId) => {
    setFavorites(prev =>
      prev.includes(hostelId)
        ? prev.filter(id => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  const getHostelById = (id) => mockHostels.find(h => h.id === parseInt(id));

  const getBookingById = (id) => bookings.find(b => b.id === parseInt(id));

  const value = {
    bookings,
    favorites,
    createBooking,
    toggleFavorite,
    getHostelById,
    getBookingById
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

//  Export the hook for convenience
export const useBooking = () => useContext(BookingContext);
