
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  showtimes: string[];
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
  onBookNow: (movie: Movie, showtime: string) => void;
}

const MovieCard = ({ movie, onBookNow }: MovieCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-all duration-300 transform hover:scale-105">
      <CardHeader>
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden relative">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background with ticket icon if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                  <svg class="w-16 h-16 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                </div>
              `;
            }}
          />
        </div>
        <CardTitle className="text-white text-xl">{movie.title}</CardTitle>
        <CardDescription className="text-slate-300">
          {movie.genre} • {movie.duration} • {movie.rating}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Today's Showtimes</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {movie.showtimes.map((time) => (
              <Button
                key={time}
                variant="outline"
                size="sm"
                className="bg-slate-700 border-slate-600 text-white hover:bg-amber-500 hover:text-black transition-colors"
                onClick={() => onBookNow(movie, time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
