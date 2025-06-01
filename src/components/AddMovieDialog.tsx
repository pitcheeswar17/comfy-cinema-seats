
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  showtimes: string[];
  poster: string;
}

interface AddMovieDialogProps {
  onAddMovie: (movie: Movie) => void;
}

const AddMovieDialog = ({ onAddMovie }: AddMovieDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [poster, setPoster] = useState("");
  const [showtimes, setShowtimes] = useState("");

  const genres = ["Sci-Fi", "Thriller", "Romance", "Action", "Adventure", "Drama", "Horror", "Comedy"];
  const ratings = ["G", "PG", "PG-13", "R"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !genre || !duration || !rating || !poster) {
      alert("Please fill in all fields");
      return;
    }

    const showtimeArray = showtimes.split(',').map(time => time.trim()).filter(time => time);
    if (showtimeArray.length === 0) {
      alert("Please add at least one showtime");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title,
      genre,
      duration,
      rating,
      poster,
      showtimes: showtimeArray
    };

    onAddMovie(newMovie);
    
    // Reset form
    setTitle("");
    setGenre("");
    setDuration("");
    setRating("");
    setPoster("");
    setShowtimes("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Add New Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Add New Movie</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-slate-300">Movie Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <Label className="text-slate-300">Genre</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bg-slate-700 border-slate-600 text-white justify-start">
                  {genre || "Select genre"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-700 border-slate-600">
                {genres.map((g) => (
                  <DropdownMenuItem
                    key={g}
                    onClick={() => setGenre(g)}
                    className="text-white hover:bg-slate-600"
                  >
                    {g}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Label htmlFor="duration" className="text-slate-300">Duration</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., 2h 15m"
            />
          </div>

          <div>
            <Label className="text-slate-300">Rating</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bg-slate-700 border-slate-600 text-white justify-start">
                  {rating || "Select rating"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-700 border-slate-600">
                {ratings.map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => setRating(r)}
                    className="text-white hover:bg-slate-600"
                  >
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Label htmlFor="poster" className="text-slate-300">Poster URL</Label>
            <Input
              id="poster"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <Label htmlFor="showtimes" className="text-slate-300">Showtimes</Label>
            <Input
              id="showtimes"
              value={showtimes}
              onChange={(e) => setShowtimes(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., 14:30, 17:45, 20:30"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-medium"
          >
            Add Movie
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
