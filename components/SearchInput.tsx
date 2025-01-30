import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
            type="text"
            placeholder={placeholder || 'Search...'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10"
        />
    </div>
  );
}

export default SearchInput;