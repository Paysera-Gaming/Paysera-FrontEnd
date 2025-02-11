import { TAttendance } from '@/api/AttendanceAPI';
import { TSchedule } from '@/api/ScheduleAPI';
import { useUserStore } from '@/stores/userStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { differenceInHours } from 'date-fns';

const changeFavicon = (url: string) => {
	const link: HTMLLinkElement | null =
		document.querySelector("link[rel~='icon']");
	if (link) {
		link.rel = 'icon';
		link.type = 'image/svg+xml'; // Specify the type for SVG
		link.href = url;
		document.head.appendChild(link);
	}
};
const days = [
	'SUNDAY',
	'MONDAY',
	'TUESDAY',
	'WEDNESDAY',
	'THURSDAY',
	'FRIDAY',
	'SATURDAY',
] as const;

function isNineHoursApart(startDate: Date, endDate: Date) {
	return differenceInHours(new Date(startDate), new Date(endDate)) >= 9;
}

export default function useAlertTimeup() {
	//  i have to set the alarm to true when successfully posting an attendance
	const userStore = useUserStore();

	const queryClient = useQueryClient();

	const userAttendance = queryClient.getQueryData<TAttendance>([
		'UsersAttendance',
	]);
	const userDepartmentSchedule = userStore.getUser()?.departmentSchedule;
	const userPersonalDepartmentSchedule = userStore.getUser()?.personalSchedule;

	function startAlarm() {
		document.title = 'Your Time Is Up!';
		changeFavicon('/Alert.svg');

		if (Notification.permission === 'granted') {
			new Notification('(Paysera Attendace) Your Time Is Up!', {
				body: 'Either clock out or begin your overtime',
				badge: '/Alert.svg',
			});
		}

		toast.warning(
			'Your time is up please proceed to request your overtime or clock out',
			{
				duration: Infinity,
				onDismiss: () => {
					document.title = 'Paysera Attendance';
					changeFavicon('/PayseraIcon.svg');
				},
			}
		);
	}

	// for each one hour this should run
	function evaluateAlarmType() {
		const today = days[new Date().getDay()];

		// checks if personal sched exists and the day it recides work
		if (
			userPersonalDepartmentSchedule &&
			userPersonalDepartmentSchedule.day.includes(today)
		) {
			validateSchedType(userPersonalDepartmentSchedule.Schedule);
		} else if (userDepartmentSchedule) {
			validateSchedType(userDepartmentSchedule.Schedule);
		}
		return;
	}

	function validateSchedType(schedule: TSchedule) {
		// if user has fixed sched check the start time of said schedule
		// compare the date today and the date of the said schedule
		// if user not fixed compare when the time started

		if (!userAttendance) {
			return;
		}
		// if user has already timed out then this will return
		if (userAttendance?.timeOut) return;

		if (schedule?.scheduleType === 'FIXED') {
			const scheduleStartTime = new Date(schedule.startTime);
			const now = new Date();
			scheduleStartTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

			if (isNineHoursApart(scheduleStartTime, now)) {
				return startAlarm();
			}
		} else {
			if (isNineHoursApart(new Date(userAttendance.createdAt), new Date())) {
				return startAlarm();
			}
		}
	}

	return { evaluateAlarmType };
}
