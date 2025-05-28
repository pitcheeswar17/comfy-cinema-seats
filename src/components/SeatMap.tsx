
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

interface SeatMapProps {
  onSeatSelect: (seats: Seat[]) => void;
  selectedSeats: Seat[];
}

const SeatMap = ({ onSeatSelect, selectedSeats }: SeatMapProps) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  
  // Initialize seats with some pre-booked seats for demonstration
  const [seats, setSeats] = useState<Seat[]>(() => {
    const allSeats: Seat[] = [];
    const bookedSeats = ['A3', 'A4', 'B5', 'C2', 'C9', 'D6', 'E1', 'F8', 'G3', 'H7'];
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        allSeats.push({
          id: seatId,
          row,
          number: i,
          isBooked: bookedSeats.includes(seatId),
          isSelected: false
        });
      }
    });
    return allSeats;
  });

  const handleSeatClick = (seatId: string) => {
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId && !seat.isBooked) {
        const newSeat = { ...seat, isSelected: !seat.isSelected };
        return newSeat;
      }
      return seat;
    });
    
    setSeats(updatedSeats);
    const selected = updatedSeats.filter(seat => seat.isSelected);
    onSeatSelect(selected);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isBooked) return "bg-red-600 cursor-not-allowed";
    if (seat.isSelected) return "bg-amber-500 hover:bg-amber-600";
    return "bg-slate-600 hover:bg-slate-500";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-full h-3 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full mb-2"></div>
        <p className="text-slate-300 text-sm">SCREEN</p>
      </div>
      
      <div className="space-y-4">
        {rows.map(row => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="w-8 text-center text-slate-300 font-medium">{row}</span>
            <div className="flex gap-2">
              {seats
                .filter(seat => seat.row === row)
                .map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.isBooked}
                    className={cn(
                      "w-8 h-8 rounded-t-lg transition-all duration-200 text-xs font-medium",
                      getSeatColor(seat)
                    )}
                    title={`Seat ${seat.id} ${seat.isBooked ? '(Booked)' : seat.isSelected ? '(Selected)' : '(Available)'}`}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
            <span className="w-8 text-center text-slate-300 font-medium">{row}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-8 mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-600 rounded-t"></div>
          <span className="text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded-t"></div>
          <span className="text-slate-300">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-t"></div>
          <span className="text-slate-300">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
