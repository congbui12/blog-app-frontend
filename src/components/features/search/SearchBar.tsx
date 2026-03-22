import { useState, type ChangeEvent } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (term: string) => void;
  defaultValue?: string;
  autoFocus?: boolean;
}

const SearchBar = ({ placeholder, onSearch, defaultValue = '', autoFocus }: SearchBarProps) => {
  const [term, setTerm] = useState(defaultValue);

  const handleSearch = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!term.trim()) {
      return;
    }
    onSearch(term.trim());
    // setTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        id="search"
        type="search"
        value={term}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
      />

      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5 text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
};

export default SearchBar;
