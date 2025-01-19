import { useEffect } from 'react';

import { useUserStore } from '@/stores/userStore';

export default function TimesUp() {
	useEffect(() => {
		const checkTime = () => {
			const now = new Date();
			const currentHour = now.getHours();
			const currentMinute = now.getMinutes();
			const endTime = useUserStore().getUser()?.schedule?.Schedule.endTime;

			// Check if it's 12:00 PM
			if (endTime && currentMinute === 0) {
				console.log('Time’s up! It’s 12:00 PM!');
			}
		};

		// Set an interval to check the time every second
		const interval = setInterval(checkTime, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, []);
}
