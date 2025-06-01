
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  availableGenres: string[];
}

const GenreFilter = ({ selectedGenre, onGenreChange, availableGenres }: GenreFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
          {selectedGenre === "All" ? "All Genres" : selectedGenre}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-700 border-slate-600">
        <DropdownMenuItem
          onClick={() => onGenreChange("All")}
          className="text-white hover:bg-slate-600"
        >
          All Genres
        </DropdownMenuItem>
        {availableGenres.map((genre) => (
          <DropdownMenuItem
            key={genre}
            onClick={() => onGenreChange(genre)}
            className="text-white hover:bg-slate-600"
          >
            {genre}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenreFilter;
