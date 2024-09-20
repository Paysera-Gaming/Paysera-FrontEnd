import { FileQuestion } from 'lucide-react';

export default function ErrorDisplay() {
	return (
		<div className="flex items-center justify-center flex-col h-full ">
			<FileQuestion className="h-20 w-20" />
			<h1 className="text-4xl font-bold">Server Error</h1>
			<p className="text-lg">The Server Seems To Be Offline</p>
		</div>
	);
}
