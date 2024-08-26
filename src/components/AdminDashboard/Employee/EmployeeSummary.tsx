import React from 'react';
import { LogIn, LogOut, Coffee, PowerOff, Users } from 'lucide-react';

const EmployeeSummary = ({
  totalActive,
  activeFixed,
  activeFlexible,
  activeSuperFlexible,
  totalOnLunch,
  lunchFixed,
  lunchFlexible,
  lunchSuperFlexible,
  totalOnLeave,
  leaveFixed,
  leaveFlexible,
  leaveSuperFlexible,
  totalOffline,
  offlineFixed,
  offlineFlexible,
  offlineSuperFlexible,
  onStatusFilterChange,
}) => {
  // Calculate the overall total by summing all status counts
  const totalOverall =
    totalActive + totalOnLunch + totalOnLeave + totalOffline;
  const overallFixed =
    activeFixed + lunchFixed + leaveFixed + offlineFixed;
  const overallFlexible =
    activeFlexible + lunchFlexible + leaveFlexible + offlineFlexible;
  const overallSuperFlexible =
    activeSuperFlexible +
    lunchSuperFlexible +
    leaveSuperFlexible +
    offlineSuperFlexible;

  const summaryItems = [
    {
      title: 'Overall Total',
      count: totalOverall,
      fixed: overallFixed,
      flexible: overallFlexible,
      superFlexible: overallSuperFlexible,
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-600',
      icon: <Users className="w-6 h-6 text-gray-600" />,
      status: 'all', // Use 'all' for resetting the filter
      isOverall: true, // Mark this as the "Overall" item
    },
    {
      title: 'Active',
      count: totalActive,
      fixed: activeFixed,
      flexible: activeFlexible,
      superFlexible: activeSuperFlexible,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-600',
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      status: 'Active',
    },
    {
      title: 'On Lunch',
      count: totalOnLunch,
      fixed: lunchFixed,
      flexible: lunchFlexible,
      superFlexible: lunchSuperFlexible,
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-orange-600',
      icon: <Coffee className="w-6 h-6 text-orange-600" />,
      status: 'Lunch',
    },
    {
      title: 'On Leave',
      count: totalOnLeave,
      fixed: leaveFixed,
      flexible: leaveFlexible,
      superFlexible: leaveSuperFlexible,
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-600',
      icon: <LogOut className="w-6 h-6 text-red-600" />,
      status: 'Leave',
    },
    {
      title: 'Offline',
      count: totalOffline,
      fixed: offlineFixed,
      flexible: offlineFlexible,
      superFlexible: offlineSuperFlexible,
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-600',
      icon: <PowerOff className="w-6 h-6 text-gray-600" />,
      status: 'Offline',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-0">
      {summaryItems.map(
        ({
          title,
          count,
          fixed,
          flexible,
          superFlexible,
          color,
          borderColor,
          textColor,
          icon,
          status,
          isOverall, // Destructure the isOverall property
        }) => (
          <div
            key={title}
            onClick={() => onStatusFilterChange(isOverall ? "all" : status)}
            className={`p-4 rounded-lg border ${borderColor} ${color} text-center shadow-md cursor-pointer transform transition-transform duration-200 hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                {icon}
                <p className="text-3xl font-bold text-black ml-2">{count}</p>
              </div>
              <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
              <div className="text-sm text-gray-800">
                <p>
                  Fixed: {fixed}, Flexible: {flexible}, Super Flexible: {superFlexible}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EmployeeSummary;
