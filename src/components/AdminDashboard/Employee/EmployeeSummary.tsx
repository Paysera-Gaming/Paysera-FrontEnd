import { LogIn, PowerOff, Users } from 'lucide-react';

interface EmployeeSummaryProps {
  totalActive: number;
  activeFixed: number;
  activeFlexible: number;
  activeSuperFlexible: number;
  totalOnLunch: number;
  lunchFixed: number;
  lunchFlexible: number;
  lunchSuperFlexible: number;
  totalOnLeave: number;
  leaveFixed: number;
  leaveFlexible: number;
  leaveSuperFlexible: number;
  totalOffline: number;
  offlineFixed: number;
  offlineFlexible: number;
  offlineSuperFlexible: number;
  onStatusFilterChange: (status: string) => void;
}

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
}: EmployeeSummaryProps) => {
  // Add Lunch to Active counts
  const totalActiveWithLunch = totalActive + totalOnLunch;
  const activeFixedWithLunch = activeFixed + lunchFixed;
  const activeFlexibleWithLunch = activeFlexible + lunchFlexible;
  const activeSuperFlexibleWithLunch = activeSuperFlexible + lunchSuperFlexible;

  // Add Leave to Offline counts
  const totalOfflineWithLeave = totalOffline + totalOnLeave;
  const offlineFixedWithLeave = offlineFixed + leaveFixed;
  const offlineFlexibleWithLeave = offlineFlexible + leaveFlexible;
  const offlineSuperFlexibleWithLeave = offlineSuperFlexible + leaveSuperFlexible;

  // Calculate the overall total by summing Active (including Lunch) and Offline (including Leave)
  const totalOverall = totalActiveWithLunch + totalOfflineWithLeave;
  const overallFixed = activeFixedWithLunch + offlineFixedWithLeave;
  const overallFlexible = activeFlexibleWithLunch + offlineFlexibleWithLeave;
  const overallSuperFlexible = activeSuperFlexibleWithLunch + offlineSuperFlexibleWithLeave;

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
      count: totalActiveWithLunch, // Including Lunch
      fixed: activeFixedWithLunch,
      flexible: activeFlexibleWithLunch,
      superFlexible: activeSuperFlexibleWithLunch,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-600',
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      status: 'Active',
    },
    {
      title: 'Offline',
      count: totalOfflineWithLeave, // Including Leave
      fixed: offlineFixedWithLeave,
      flexible: offlineFlexibleWithLeave,
      superFlexible: offlineSuperFlexibleWithLeave,
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-600',
      icon: <PowerOff className="w-6 h-6 text-red-600" />,
      status: 'Offline',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
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
          isOverall,
        }) => (
          <div
            key={title}
            onClick={() => onStatusFilterChange(isOverall ? 'all' : status)}
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
