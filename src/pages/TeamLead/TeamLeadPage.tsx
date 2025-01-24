import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';

export default function TeamLeadPage() {
	return (
		<div className="h-[100svh] w-[100svw] flex flex-1 items-center justify-start p-5 gap-5 ">
			<TeamLeadNavigation></TeamLeadNavigation>

			<main className="flex w-full h-full flex-1 items-center justify-start flex-col gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
		</div>
	);
}
