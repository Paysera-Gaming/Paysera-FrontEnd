import React from 'react';
import { UserIcon, ClockIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';

const EmployeeSummary = ({ totalActive, activeFixed, activeFlexible, activeSuperFlexible, totalOnLunch, lunchFixed, lunchFlexible, lunchSuperFlexible, totalOnLeave, leaveFixed, leaveFlexible, leaveSuperFlexible, totalOffline, offlineFixed, offlineFlexible, offlineSuperFlexible }) => {
  const summaryItems = [
    {
      title: "Active",
      count: totalActive,
      fixed: activeFixed,
      flexible: activeFlexible,
      superFlexible: activeSuperFlexible,
      color: "bg-green-100",
      borderColor: "border-green-300",
      textColor: "text-green-600",  // Font color for Active title
      icon: <UserIcon className="w-8 h-8 text-green-600" />
    },
    {
      title: "On Lunch",
      count: totalOnLunch,
      fixed: lunchFixed,
      flexible: lunchFlexible,
      superFlexible: lunchSuperFlexible,
      color: "bg-yellow-100",
      borderColor: "border-yellow-300",
      textColor: "text-orange-600",  // Font color for On Lunch title
      icon: <ClockIcon className="w-8 h-8 text-orange-600" />
    },
    {
      title: "On Leave",
      count: totalOnLeave,
      fixed: leaveFixed,
      flexible: leaveFlexible,
      superFlexible: leaveSuperFlexible,
      color: "bg-red-100",
      borderColor: "border-red-300",
      textColor: "text-red-600",  // Font color for On Leave title
      icon: <ShieldCheckIcon className="w-8 h-8 text-red-600" />
    },
    {
      title: "Offline",
      count: totalOffline,
      fixed: offlineFixed,
      flexible: offlineFlexible,
      superFlexible: offlineSuperFlexible,
      color: "bg-gray-100",
      borderColor: "border-gray-300",
      textColor: "text-gray-600",  // Font color for Offline title
      icon: <UsersIcon className="w-8 h-8 text-gray-600" />
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-0">
      {summaryItems.map(({ title, count, fixed, flexible, superFlexible, color, borderColor, textColor, icon }) => (
        <div 
          key={title} 
          className={`p-4 rounded-lg border ${borderColor} ${color} text-center shadow-md`}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              {icon}
              <p className="text-4xl font-bold text-black ml-2">{count}</p>  {/* Black font for total count */}
            </div>
            <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
            <div className="text-sm text-gray-500">
              <p>Fixed: {fixed}, Flexible: {flexible}, Super Flexible: {superFlexible}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeSummary;
