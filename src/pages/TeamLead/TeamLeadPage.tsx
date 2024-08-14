import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';

export default function TeamLeadPage() {
	return (
		<div className="h-full flex flex-1 items-center justify-start p-5 gap-5">
			<TeamLeadNavigation></TeamLeadNavigation>
			{/* delete this h full and w full if something krazy happens */}
			<section className="flex h-full w-full items-center justify-start flex-col flex-1 gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</section>
		</div>
	);
}
