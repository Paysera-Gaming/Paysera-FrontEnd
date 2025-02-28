import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  accessLevel: string;
  setAccessLevel: (level: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  accessLevel,
  setAccessLevel,
}: SearchBarProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = () => {
    setIsFormOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccessLevelChange = (level: string) => {
    setAccessLevel(level);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs"
          />
          <div className="flex items-center space-x-2" ref={dropdownRef}>
            <Button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Filter
            </Button>
            <span className="text-white">Filtered: {accessLevel || "All"}</span>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("")}
                  >
                    All Access Levels
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("ADMIN")}
                  >
                    Admin
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("TEAM_LEADER")}
                  >
                    Team Leader
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("EMPLOYEE")}
                  >
                    Employee
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("AUDITOR")}
                  >
                    Auditor
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleAccessLevelChange("SUPER_AUDITOR")}
                  >
                    Super Auditor
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Employee
          </Button>
        </div>
      </div>
      <EmployeeForm
        isOpen={isFormOpen}
        onSubmit={handleFormSubmit}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
