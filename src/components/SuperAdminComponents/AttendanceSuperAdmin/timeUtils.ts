export const parseTime = (time: string) => {
    const [hours, minutes] = time.split(/[: ]/);
    const period = time.slice(-2); // AM or PM
    let hours24 = parseInt(hours, 10);

    if (period === 'PM' && hours24 !== 12) hours24 += 12;
    if (period === 'AM' && hours24 === 12) hours24 = 0;

    return { hours: hours24, minutes: parseInt(minutes) };
};

export const timeDifferenceInHours = (startTime: { hours: number, minutes: number }, endTime: { hours: number, minutes: number }) => {
    const startMinutes = startTime.hours * 60 + startTime.minutes;
    const endMinutes = endTime.hours * 60 + endTime.minutes;
    const diffInMinutes = endMinutes - startMinutes;

    return diffInMinutes / 60; // Return the difference in hours
};

export const formatDateTime = (date: string, time: { hours: number, minutes: number }) => {
    const dateObj = new Date(date);
    dateObj.setHours(time.hours, time.minutes, 0, 0);
    return dateObj.toISOString();
};