export const calculateTotalHours = (startTime: string, endTime: string): number => {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
};

export const determineSituation = (
  part1EndTime: string,
  lunchStartTime: string,
  lunchEndTime: string,
  part2EndTime: string
): string => {
  const now = new Date().getHours();
  const lunchStart = parseInt(lunchStartTime.split(":")[0]);
  const lunchEnd = parseInt(lunchEndTime.split(":")[0]);
  const part1End = parseInt(part1EndTime.split(":")[0]);
  const part2End = parseInt(part2EndTime.split(":")[0]);

  if (now >= lunchStart && now < lunchEnd) return "Lunch";
  if (now >= part1End && now < part2End) return "On Job";
  return "Leave";
};

export const getSituationStyle = (situation: string): string => {
  switch (situation) {
    case "On Job":
      return "bg-green-100 text-green-800";
    case "Lunch":
      return "bg-blue-100 text-blue-800";
    case "Leave":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

export const getSituationTooltip = (situation: string): string => {
  switch (situation) {
    case "On Job":
      return "Employee is currently working.";
    case "Lunch":
      return "Employee is on lunch break.";
    case "Leave":
      return "Employee is on leave.";
    default:
      return "";
  }
};

// Helper function to format the name
export const formatName = (fullName: string): string => {
  const parts = fullName.split(" ");
  if (parts.length === 2) {
    return `${parts[1]}, ${parts[0]}`;
  } else if (parts.length > 2) {
    const lastName = parts.pop();
    return `${lastName}, ${parts.join(" ")}`;
  } else {
    return fullName; // If there's only one part, return it as is.
  }
};
