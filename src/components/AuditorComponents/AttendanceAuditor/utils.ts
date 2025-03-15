export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

export const formatTime = (timeString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(timeString));
};

export const calculateWorkTimeTotal = (timeIn: string, timeOut: string, lunchTimeTotal: number) => {
  const timeInDate = new Date(timeIn);
  const timeOutDate = new Date(timeOut);
  const workTimeMs = timeOutDate.getTime() - timeInDate.getTime() - lunchTimeTotal * 60 * 60 * 1000;
  const workTimeHours = workTimeMs / (1000 * 60 * 60);
  return workTimeHours.toFixed(2); // Format to 2 decimal places
};