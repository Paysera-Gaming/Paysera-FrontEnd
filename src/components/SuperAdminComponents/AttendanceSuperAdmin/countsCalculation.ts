import { Attendance } from './types';

export const countStatus = (list: Attendance[], status: string) => list.filter(a => a.status === status).length;

export const calculateCounts = (filteredAttendanceList: Attendance[] | undefined) => {
  const overallCounts = {
    ongoing: countStatus(filteredAttendanceList || [], 'ONGOING'),
    break: countStatus(filteredAttendanceList || [], 'BREAK'),
    done: countStatus(filteredAttendanceList || [], 'DONE'),
    paidLeave: countStatus(filteredAttendanceList || [], 'PAID_LEAVE'),
  };

  const fixedCounts = {
    ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'ONGOING'),
    break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'BREAK'),
    done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'DONE'),
    paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'PAID_LEAVE'),
  };

  const SUPER_FLEXICounts = {
    ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'ONGOING'),
    break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'BREAK'),
    done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'DONE'),
    paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'PAID_LEAVE'),
  };

  const flexiCounts = {
    ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'ONGOING'),
    break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'BREAK'),
    done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'DONE'),
    paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'PAID_LEAVE'),
  };

  const overallCount = filteredAttendanceList?.length || 0;
  const fixedCount = filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED').length || 0;
  const SUPER_FLEXICount = filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI').length || 0;
  const flexiCount = filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI').length || 0;

  return {
    overallCounts,
    fixedCounts,
    SUPER_FLEXICounts,
    flexiCounts,
    overallCount,
    fixedCount,
    SUPER_FLEXICount,
    flexiCount,
  };
};