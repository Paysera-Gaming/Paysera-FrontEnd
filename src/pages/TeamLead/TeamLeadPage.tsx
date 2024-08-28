import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';
import { Toaster } from '@/components/ui/sonner';
export default function TeamLeadPage() {
	return (
		<div className="h-full w-full flex flex-1 items-center justify-start p-5 gap-5">
			<TeamLeadNavigation></TeamLeadNavigation>
			{/* delete this h full and w full if something krazy happens */}
			<main className="flex w-full h-full items-center justify-start flex-col flex-1 gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
			<Toaster richColors closeButton></Toaster>
		</div>
	);
}
