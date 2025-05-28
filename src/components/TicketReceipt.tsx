
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ticket, Calendar, Clock } from "lucide-react";

interface TicketReceiptProps {
  movieTitle: string;
  showtime: string;
  seats: string[];
  totalPrice: number;
  bookingId: string;
  onNewBooking: () => void;
}

const TicketReceipt = ({ 
  movieTitle, 
  showtime, 
  seats, 
  totalPrice, 
  bookingId,
  onNewBooking 
}: TicketReceiptProps) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-t-lg">
          <div className="flex justify-center mb-2">
            <Ticket className="w-8 h-8 text-amber-400" />
          </div>
          <CardTitle className="text-xl">CINEMA TICKET</CardTitle>
          <p className="text-amber-200 text-sm">Booking Confirmation</p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{movieTitle}</h3>
            <p className="text-gray-600">Booking ID: {bookingId}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">Date</span>
              </div>
              <span className="font-medium">{currentDate}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">Showtime</span>
              </div>
              <span className="font-medium">{showtime}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Seats</span>
              <span className="font-medium">{seats.join(', ')}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Quantity</span>
              <span className="font-medium">{seats.length} ticket(s)</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-purple-900">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Please arrive 15 minutes before showtime</p>
            <p>Present this ticket at the cinema entrance</p>
          </div>
          
          <Button 
            onClick={onNewBooking}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Book Another Movie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketReceipt;
