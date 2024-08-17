// AttendanceComponent/Summary.tsx
import React from "react";
import { UserIcon, ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

interface SummaryProps {
  situationCounts: {
    "On Job": number;
    "Lunch": number;
    "Leave": number;
  };
}

export const Summary: React.FC<SummaryProps> = ({ situationCounts }) => (
  <div className="mb-4 grid grid-cols-3 gap-2">
    <div className="p-2 bg-green-100 border border-green-300 rounded shadow-sm text-center">
      <div className="flex items-center justify-center mb-1">
        <UserIcon className="w-6 h-6 text-green-600" />
        <p className="text-4xl font-bold ml-2">{situationCounts["On Job"]}</p>
      </div>
      <p className="text-lg font-medium text-green-600">On Job</p>
    </div>
    <div className="p-2 bg-blue-100 border border-blue-300 rounded shadow-sm text-center">
      <div className="flex items-center justify-center mb-1">
        <ClockIcon className="w-6 h-6 text-blue-600" />
        <p className="text-4xl font-bold ml-2">{situationCounts["Lunch"]}</p>
      </div>
      <p className="text-lg font-medium text-blue-600">Lunch</p>
    </div>
    <div className="p-2 bg-red-100 border border-red-300 rounded shadow-sm text-center">
      <div className="flex items-center justify-center mb-1">
        <ShieldCheckIcon className="w-6 h-6 text-red-600" />
        <p className="text-4xl font-bold ml-2">{situationCounts["Leave"]}</p>
      </div>
      <p className="text-lg font-medium text-red-600">Leave</p>
    </div>
  </div>
);
