import React from "react";
import { UserIcon, ClockIcon, ShieldCheckIcon, CalculatorIcon } from "@heroicons/react/24/outline";

interface SituationTypeCount {
  Fixed: number;
  Flexible: number;
  SuperFlexible: number;
}

interface SummaryProps {
  situationCounts: {
    "On Job": SituationTypeCount;
    "Lunch": SituationTypeCount;
    "Leave": SituationTypeCount;
  };
}

export const Summary: React.FC<SummaryProps> = ({ situationCounts }) => {
  const overallTotal = {
    Fixed: situationCounts["On Job"].Fixed + situationCounts["Lunch"].Fixed + situationCounts["Leave"].Fixed,
    Flexible: situationCounts["On Job"].Flexible + situationCounts["Lunch"].Flexible + situationCounts["Leave"].Flexible,
    SuperFlexible: situationCounts["On Job"].SuperFlexible + situationCounts["Lunch"].SuperFlexible + situationCounts["Leave"].SuperFlexible,
  };

  const overallTotalCount = overallTotal.Fixed + overallTotal.Flexible + overallTotal.SuperFlexible;

  return (
    <div className="mb-4 grid grid-cols-4 gap-4">
      <div className="p-4 bg-gray-100 border border-gray-300 rounded shadow-sm text-center">
        <div className="flex items-center justify-center mb-1">
          <CalculatorIcon className="w-6 h-6 text-gray-600" />
          <p className="text-4xl font-bold ml-2">{overallTotalCount}</p>
        </div>
        <p className="text-lg font-medium text-gray-600">Overall Total</p>
        <p className="text-sm text-black">
          Fixed: {overallTotal.Fixed}, Flexible: {overallTotal.Flexible}, Super Flexible: {overallTotal.SuperFlexible}
        </p>
      </div>
      <div className="p-4 bg-green-100 border border-green-300 rounded shadow-sm text-center">
        <div className="flex items-center justify-center mb-1">
          <UserIcon className="w-6 h-6 text-green-600" />
          <p className="text-4xl font-bold ml-2">
            {situationCounts["On Job"].Fixed + situationCounts["On Job"].Flexible + situationCounts["On Job"].SuperFlexible}
          </p>
        </div>
        <p className="text-lg font-medium text-green-600">On Job</p>
        <p className="text-sm text-black">
          Fixed: {situationCounts["On Job"].Fixed}, Flexible: {situationCounts["On Job"].Flexible}, Super Flexible: {situationCounts["On Job"].SuperFlexible}
        </p>
      </div>
      <div className="p-4 bg-blue-100 border border-blue-300 rounded shadow-sm text-center">
        <div className="flex items-center justify-center mb-1">
          <ClockIcon className="w-6 h-6 text-blue-600" />
          <p className="text-4xl font-bold ml-2">
            {situationCounts["Lunch"].Fixed + situationCounts["Lunch"].Flexible + situationCounts["Lunch"].SuperFlexible}
          </p>
        </div>
        <p className="text-lg font-medium text-blue-600">Lunch</p>
        <p className="text-sm text-black">
          Fixed: {situationCounts["Lunch"].Fixed}, Flexible: {situationCounts["Lunch"].Flexible}, Super Flexible: {situationCounts["Lunch"].SuperFlexible}
        </p>
      </div>
      <div className="p-4 bg-red-100 border border-red-300 rounded shadow-sm text-center">
        <div className="flex items-center justify-center mb-1">
          <ShieldCheckIcon className="w-6 h-6 text-red-600" />
          <p className="text-4xl font-bold ml-2">
            {situationCounts["Leave"].Fixed + situationCounts["Leave"].Flexible + situationCounts["Leave"].SuperFlexible}
          </p>
        </div>
        <p className="text-lg font-medium text-red-600">Leave</p>
        <p className="text-sm text-black">
          Fixed: {situationCounts["Leave"].Fixed}, Flexible: {situationCounts["Leave"].Flexible}, Super Flexible: {situationCounts["Leave"].SuperFlexible}
        </p>
      </div>
    </div>
  );
};
