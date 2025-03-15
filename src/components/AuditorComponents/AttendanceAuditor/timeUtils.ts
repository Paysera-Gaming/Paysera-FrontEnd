export const parseTime = (time: string | null | undefined) => {
    if (!time) {
      return { hours: 0, minutes: 0 }
    }
    const [hours, minutes] = time.split(":")
    return { hours: Number.parseInt(hours, 10), minutes: Number.parseInt(minutes, 10) }
  }
  
  export const timeDifferenceInHours = (
    startTime: { hours: number; minutes: number },
    endTime: { hours: number; minutes: number },
  ) => {
    const startMinutes = startTime.hours * 60 + startTime.minutes
    const endMinutes = endTime.hours * 60 + endTime.minutes
    const diffInMinutes = endMinutes - startMinutes
  
    return diffInMinutes / 60 // Return the difference in hours
  }
  
  export const formatDateTime = (date: string, time: { hours: number; minutes: number }) => {
    const dateObj = new Date(date)
    dateObj.setHours(time.hours, time.minutes, 0, 0)
    return dateObj.toISOString()
  }
  
  export const formatTime = (time: { hours: number; minutes: number }) => {
    return `${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}`
  }
  
  