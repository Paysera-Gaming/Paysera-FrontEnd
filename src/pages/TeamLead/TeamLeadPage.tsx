import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';

export default function TeamLeadPage() {
	return (
		<div className="h-[100svh] w-[100svw] flex flex-1 items-center justify-start p-5 gap-5">
			<TeamLeadNavigation></TeamLeadNavigation>
			{/* delete this h full and w full if something krazy happens */}
			<main className="flex h-full items-center justify-start flex-col flex-1 gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
		</div>
	);
}
