import { createContext, useState, useEffect, useContext } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserBookings();
    loadFavorites();
  }, []);

  const loadUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      // Reload bookings after creating new one
      await loadUserBookings();

      return data.booking.id;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (hostelId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(hostelId)
        ? prev.filter(id => id !== hostelId)
        : [...prev, hostelId];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const getHostelById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hostels/${id}`);
      if (!response.ok) throw new Error('Hostel not found');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch hostel:', error);
      return null;
    }
  };

  const getBookingById = (id) => bookings.find(b => b.id === parseInt(id));

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking');
      }

      // Reload bookings after cancellation
      await loadUserBookings();

      return data.booking;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    favorites,
    loading,
    createBooking,
    toggleFavorite,
    getHostelById,
    getBookingById,
    cancelBooking,
    refreshBookings: loadUserBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

//  Export the hook for convenience
export const useBooking = () => useContext(BookingContext);
