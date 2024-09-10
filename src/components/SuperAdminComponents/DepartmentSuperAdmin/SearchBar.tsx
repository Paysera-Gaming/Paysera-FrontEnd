import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by department name, leader, or members"
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:text-white dark:bg-transparent"
      />
    </div>
  );
};

export default SearchBar;