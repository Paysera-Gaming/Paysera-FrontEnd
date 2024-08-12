import { Outlet } from 'react-router-dom';

import TeamLeadNavigation from '@/components/TeamLeadComponents/TeamLeadNavigationBar';

export default function TeamLeadPage() {
	return (
		<>
			<TeamLeadNavigation></TeamLeadNavigation>
			<Outlet></Outlet>
		</>
	);
}
