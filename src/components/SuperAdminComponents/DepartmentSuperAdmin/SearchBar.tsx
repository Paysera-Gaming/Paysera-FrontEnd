import React from 'react';
import { Input } from '@/components/ui/input'; // Adjust the import path as necessary

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex justify-start items-center mb-4 space-x-4">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
        className="max-w-sm dark:text-white"
      />
    </div>
  );
};

export default SearchBar;