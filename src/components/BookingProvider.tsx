
import { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  showtimes: string[];
  poster: string;
}

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

interface BookingContextType {
  currentStep: 'movies' | 'seats' | 'receipt';
  selectedMovie: Movie | null;
  selectedShowtime: string;
  selectedSeats: Seat[];
  bookingId: string;
  setCurrentStep: (step: 'movies' | 'seats' | 'receipt') => void;
  setSelectedMovie: (movie: Movie) => void;
  setSelectedShowtime: (showtime: string) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  generateBookingId: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [currentStep, setCurrentStep] = useState<'movies' | 'seats' | 'receipt'>('movies');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookingId, setBookingId] = useState('');

  const generateBookingId = () => {
    const id = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setBookingId(id);
  };

  const resetBooking = () => {
    setCurrentStep('movies');
    setSelectedMovie(null);
    setSelectedShowtime('');
    setSelectedSeats([]);
    setBookingId('');
  };

  const value = {
    currentStep,
    selectedMovie,
    selectedShowtime,
    selectedSeats,
    bookingId,
    setCurrentStep,
    setSelectedMovie,
    setSelectedShowtime,
    setSelectedSeats,
    generateBookingId,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
