import { LogIn, PowerOff, Users } from 'lucide-react';

type EmployeeSummaryProps = {
  totalActive: number,
  activeFixed: number,
  activeFlexible: number,
  activeSuperFlexible: number,
  totalOnLunch: number,
  lunchFixed: number,
  lunchFlexible: number,
  lunchSuperFlexible: number,
  totalOnLeave: number,
  leaveFixed: number,
  leaveFlexible: number,
  leaveSuperFlexible: number,
  totalOffline: number,
  offlineFixed: number,
  offlineFlexible: number,
  offlineSuperFlexible: number,
  onStatusFilterChange: (status: string) => void,
};

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
  // Ensure all values are valid numbers
  const safeTotalActive = isNaN(totalActive) ? 0 : totalActive;
  const safeActiveFixed = isNaN(activeFixed) ? 0 : activeFixed;
  const safeActiveFlexible = isNaN(activeFlexible) ? 0 : activeFlexible;
  const safeActiveSuperFlexible = isNaN(activeSuperFlexible) ? 0 : activeSuperFlexible;
  const safeTotalOnLunch = isNaN(totalOnLunch) ? 0 : totalOnLunch;
  const safeLunchFixed = isNaN(lunchFixed) ? 0 : lunchFixed;
  const safeLunchFlexible = isNaN(lunchFlexible) ? 0 : lunchFlexible;
  const safeLunchSuperFlexible = isNaN(lunchSuperFlexible) ? 0 : lunchSuperFlexible;
  const safeTotalOnLeave = isNaN(totalOnLeave) ? 0 : totalOnLeave;
  const safeLeaveFixed = isNaN(leaveFixed) ? 0 : leaveFixed;
  const safeLeaveFlexible = isNaN(leaveFlexible) ? 0 : leaveFlexible;
  const safeLeaveSuperFlexible = isNaN(leaveSuperFlexible) ? 0 : leaveSuperFlexible;
  const safeTotalOffline = isNaN(totalOffline) ? 0 : totalOffline;
  const safeOfflineFixed = isNaN(offlineFixed) ? 0 : offlineFixed;
  const safeOfflineFlexible = isNaN(offlineFlexible) ? 0 : offlineFlexible;
  const safeOfflineSuperFlexible = isNaN(offlineSuperFlexible) ? 0 : offlineSuperFlexible;

  // Calculate the overall total by summing all status counts
  const totalOverall =
    safeTotalActive + safeTotalOnLunch + safeTotalOnLeave + safeTotalOffline;
  const overallFixed =
    safeActiveFixed + safeLunchFixed + safeLeaveFixed + safeOfflineFixed;
  const overallFlexible =
    safeActiveFlexible + safeLunchFlexible + safeLeaveFlexible + safeOfflineFlexible;
  const overallSuperFlexible =
    safeActiveSuperFlexible +
    safeLunchSuperFlexible +
    safeLeaveSuperFlexible +
    safeOfflineSuperFlexible;

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
      count: safeTotalActive,
      fixed: safeActiveFixed,
      flexible: safeActiveFlexible,
      superFlexible: safeActiveSuperFlexible,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-600',
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      status: 'Active',
    },
    {
      title: 'Offline',
      count: safeTotalOffline,
      fixed: safeOfflineFixed,
      flexible: safeOfflineFlexible,
      superFlexible: safeOfflineSuperFlexible,
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-600',
      icon: <PowerOff className="w-6 h-6 text-gray-600" />,
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