import React from 'react';
import { UserIcon, ClockIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';

const EmployeeSummary = ({ totalActive, totalOnLunch, totalOnLeave, totalOffline }) => {
  const summaryItems = [
    {
      title: "Active",
      count: totalActive,
      color: "bg-green-100",
      icon: <UserIcon className="w-8 h-8 text-green-600" />
    },
    {
      title: "On Lunch",
      count: totalOnLunch,
      color: "bg-yellow-100",
      icon: <ClockIcon className="w-8 h-8 text-yellow-600" />
    },
    {
      title: "On Leave",
      count: totalOnLeave,
      color: "bg-red-100",
      icon: <ShieldCheckIcon className="w-8 h-8 text-red-600" />
    },
    {
      title: "Offline",
      count: totalOffline,
      color: "bg-gray-100",
      icon: <UsersIcon className="w-8 h-8 text-gray-600" />
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {summaryItems.map(({ title, count, color, icon }) => (
        <div key={title} className={`p-4 rounded border ${color} text-center shadow-sm`}>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              {icon}
              <p className="text-4xl font-bold text-black ml-2">{count}</p>
            </div>
            <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeSummary;
