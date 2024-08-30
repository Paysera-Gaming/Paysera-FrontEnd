import { LogIn, PowerOff, Users } from 'lucide-react';

type EmployeeSummaryProps = {
  totalActive: number;
  totalInactive: number;
  onStatusFilterChange: (status: string) => void;
};

const EmployeeSummary = ({
  totalActive,
  totalInactive,
  onStatusFilterChange,
}: EmployeeSummaryProps) => {

  const totalOverall = totalActive + totalInactive;

  const summaryItems = [
    {
      title: 'Overall Total',
      count: totalOverall,
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-600',
      icon: <Users className="w-6 h-6 text-gray-600" />,
      status: 'all',
    },
    {
      title: 'Active',
      count: totalActive,
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-600',
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      status: 'true',
    },
    {
      title: 'Inactive',
      count: totalInactive,
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-600',
      icon: <PowerOff className="w-6 h-6 text-gray-600" />,
      status: 'false',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
      {summaryItems.map(({ title, count, color, borderColor, textColor, icon, status }) => (
        <div
          key={title}
          onClick={() => onStatusFilterChange(status)}
          className={`p-4 rounded-lg border ${borderColor} ${color} text-center shadow-md cursor-pointer transform transition-transform duration-200 hover:-translate-y-1`}
        >
          <div className="flex items-center justify-center mb-2">
            <div className={`p-2 rounded-full ${textColor} mr-2`}>
              {icon}
            </div>
            <p className={`font-bold text-3xl text-black`}>{count}</p>
          </div>
          <h2 className={`font-semibold ${textColor} text-lg`}>{title}</h2>
        </div>
      ))}
    </div>
  );
};

export default EmployeeSummary;