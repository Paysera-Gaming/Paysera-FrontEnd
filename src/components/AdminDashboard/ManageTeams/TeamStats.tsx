import React from 'react';
import { Handshake, Building2 } from 'lucide-react';

const TeamStats = ({ totalTeams, totalDepartments }) => (
  <div className="flex justify-center mb-0 space-x-4 mt-0">
    {/* Added mt-8 for more space */}
    <div className="flex-1 p-4 bg-blue-100 border border-blue-300 rounded-md text-center shadow-sm">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <Handshake className="w-6 h-6 text-blue-600" />
          <p className="text-4xl font-bold text-black ml-2">{totalTeams}</p>
        </div>
        <h3 className="text-lg font-semibold text-blue-600">Total Teams</h3>
      </div>
    </div>
    <div className="flex-1 p-4 bg-green-100 border border-green-300 rounded-md text-center shadow-sm">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <Building2 className="w-6 h-6 text-green-600" />
          <p className="text-4xl font-bold text-black ml-2">{totalDepartments}</p>
        </div>
        <h3 className="text-lg font-semibold text-green-600">Total Departments</h3>
      </div>
    </div>
  </div>
);

export default TeamStats;
