import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

interface RouteItemProps {
	links: string[];
}

function RouteItems({ links }: RouteItemProps): ReactNode {
	const routes = links.map((link) => (
		<NavigationMenuItem className="w-[100px]" key={link} asChild>
			<NavLink
				className="text-center border-red-700 border-solid border-2 w-full "
				to={link}
			>
				{link}
			</NavLink>
		</NavigationMenuItem>
	));

	return routes;
}
function ProfileHeader() {
	return <p>Test</p>;
}

export default function TeamLeadNavigation() {
	const routeLinks: string[] = [
		'dashboard',
		'manage',
		'attendance',
		'schedule',
	];

	return (
		<NavigationMenu className="bg-red-400 p-5 ">
			<NavigationMenuList className="bg-green-300 flex-col flex items-center p-2 justify-center gap-y-3 ">
				<ProfileHeader></ProfileHeader>
				<RouteItems links={routeLinks} />
			</NavigationMenuList>
		</NavigationMenu>
	);
}
