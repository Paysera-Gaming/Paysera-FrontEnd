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

	if (Notification.permission === 'granted') {
		new Notification('(Paysera Attendace) Your Time Is Up!', {
			body: 'Either clock out or begin your overtime',
			badge: '/Alert.svg',
		});
	}

	toast.warning('Your Time Is Up Please Proceed to your overtime or clockout', {
		duration: Infinity,
		onDismiss: () => {
			document.title = 'Paysera Attendance';
			changeFavicon('/PayseraIcon.svg');
		},
	});
}
