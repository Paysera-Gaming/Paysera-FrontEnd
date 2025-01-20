import { toast } from 'sonner';

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

export default function alertTimeup() {
	document.title = 'Your Time Is Up!';
	changeFavicon('/Alert.svg');

	toast.warning('Your Time Is Up Please Proceed to your overtime or clockout', {
		duration: Infinity,
		onDismiss: () => {
			document.title = 'Paysera Attendance';
			changeFavicon('/PayseraIcon.svg');
		},
	});

	// useEffect(() => {
	// 	const checkTime = () => {
	// 		const now = new Date();
	// 		const currentHour = now.getHours();
	// 		const currentMinute = now.getMinutes();

	// 		// Check if it's 12:00 PM
	// 		if (userStoreEndTime && currentMinute === 0) {
	// 			console.log('Time’s up! It’s 12:00 PM!');
	// 			document.title = 'Your Time Is Up!';
	// 			toast.warning('Your Time Is Up', { duration: Infinity });
	// 		}
	// 	};

	// 	// Set an interval to check the time every second
	// 	const interval = setInterval(checkTime, 1000);

	// 	// Cleanup
	// 	return () => clearInterval(interval);
	// }, []);
}
