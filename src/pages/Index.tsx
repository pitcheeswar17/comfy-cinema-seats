import { useState } from "react";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import SeatMap from "@/components/SeatMap";
import TicketReceipt from "@/components/TicketReceipt";
import { BookingProvider, useBooking } from "@/components/BookingProvider";
import { ArrowLeft } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "Cosmic Adventure",
    genre: "Sci-Fi",
    duration: "2h 15m",
    rating: "PG-13",
    showtimes: ["14:30", "17:45", "20:30", "23:15"],
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop"
  },
  {
    id: 2,
    title: "Mystery Night",
    genre: "Thriller",
    duration: "1h 55m",
    rating: "R",
    showtimes: ["15:00", "18:15", "21:00", "23:45"],
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop"
  },
  {
    id: 3,
    title: "Love in Paris",
    genre: "Romance",
    duration: "2h 05m",
    rating: "PG",
    showtimes: ["14:00", "16:45", "19:30", "22:15"],
    poster: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=450&fit=crop"
  },
  {
    id: 4,
    title: "Action Hero",
    genre: "Action",
    duration: "2h 30m",
    rating: "PG-13",
    showtimes: ["13:45", "17:00", "20:15", "23:30"],
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop"
  },
  {
    id: 5,
    title: "Forest Escape",
    genre: "Adventure",
    duration: "1h 45m",
    rating: "PG",
    showtimes: ["13:30", "16:00", "18:45", "21:30"],
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop"
  },
  {
    id: 6,
    title: "Ocean's Call",
    genre: "Drama",
    duration: "2h 20m",
    rating: "PG-13",
    showtimes: ["14:15", "17:30", "20:45", "23:00"],
    poster: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=450&fit=crop"
  },
  {
    id: 7,
    title: "Digital Matrix",
    genre: "Sci-Fi",
    duration: "2h 35m",
    rating: "R",
    showtimes: ["13:00", "16:30", "20:00", "23:30"],
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop"
  },
  {
    id: 8,
    title: "Midnight Thriller",
    genre: "Horror",
    duration: "1h 50m",
    rating: "R",
    showtimes: ["15:30", "18:00", "21:15", "23:45"],
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop"
  }
];

const BookingApp = () => {
  const {
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
  } = useBooking();

  const handleBookNow = (movie: typeof movies[0], showtime: string) => {
    console.log('Booking movie:', movie.title, 'at', showtime);
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setCurrentStep('seats');
  };

  const handleSeatSelect = (seats: typeof selectedSeats) => {
    setSelectedSeats(seats);
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    generateBookingId();
    setCurrentStep('receipt');
  };

  const handleBackToMovies = () => {
    setCurrentStep('movies');
  };

  const handleBackToSeats = () => {
    setCurrentStep('seats');
  };

  const ticketPrice = 12.50;
  const totalPrice = selectedSeats.length * ticketPrice;

  if (currentStep === 'movies') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Cinema
              </span>{" "}
              <span className="text-white">Booking</span>
            </h1>
            <p className="text-slate-300 text-lg">Choose your movie and showtime</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'seats') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToMovies}
              className="text-white hover:text-amber-400 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedMovie?.title}</h1>
              <p className="text-slate-300">Showtime: {selectedShowtime}</p>
              <p className="text-amber-400 text-lg font-medium mt-2">
                Select your seats (${ticketPrice} per ticket)
              </p>
            </div>
          </div>

          <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />

          {selectedSeats.length > 0 && (
            <div className="text-center mt-8">
              <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-white text-lg font-medium mb-2">Booking Summary</h3>
                <p className="text-slate-300">
                  Selected Seats: {selectedSeats.map(seat => seat.id).join(', ')}
                </p>
                <p className="text-slate-300">
                  Quantity: {selectedSeats.length} ticket(s)
                </p>
                <p className="text-amber-400 text-xl font-bold mt-2">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <Button
                  onClick={handleConfirmBooking}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-medium"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 'receipt') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
            <p className="text-slate-300">Your tickets have been successfully booked</p>
          </div>

          <TicketReceipt
            movieTitle={selectedMovie?.title || ''}
            showtime={selectedShowtime}
            seats={selectedSeats.map(seat => seat.id)}
            totalPrice={totalPrice}
            bookingId={bookingId}
            onNewBooking={resetBooking}
          />
        </div>
      </div>
    );
  }

  return null;
};

const Index = () => {
  return (
    <BookingProvider>
      <BookingApp />
    </BookingProvider>
  );
};

export default Index;
