import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';

export default function TeamLeadPage() {
	return (
		<div className="h-full flex items-center justify-start p-5">
			<TeamLeadNavigation></TeamLeadNavigation>
			<Outlet></Outlet>
		</div>
	);
}
