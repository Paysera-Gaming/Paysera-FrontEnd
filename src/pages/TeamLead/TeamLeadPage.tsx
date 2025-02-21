import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';

export default function TeamLeadPage() {
	return (
		<div className="h-[100svh] w-[100svw] min-h-0 min-w-0 flex items-center justify-start p-5 gap-10 relative">
			<TeamLeadNavigation></TeamLeadNavigation>

			<main className="ml-[calc(4rem_+_1.25rem)] flex w-full h-full flex-1 items-center justify-start flex-col gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
		</div>
	);
}
