import { Home, Calendar, FolderKanban, UserCheck } from 'lucide-react';
import { Icons } from '@/icons/Icon';
// router
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

// logout component

import LogOutButton from '../LogoutComponent/LogoutButton';

import { ModeToggle } from '../ThemeProvider/ThemeSwitch';

import { cn } from '@/lib/utils';
interface RouteItemProps {
	links: string[];
}

// this is me rendering the routes list
// you could also use a map for this, map the name and corrolate them
// with the route given
// might to this later
function RouteItems({ links }: RouteItemProps): ReactNode {
	const iconList = [
		<Home></Home>,
		<FolderKanban></FolderKanban>,
		<UserCheck></UserCheck>,
		<Calendar></Calendar>,
	];

	const routes = links.map((link, index) => {
		return (
			<li
				className="my-3 "
				key={link}
				onClick={() => {
					document.getElementById(link)?.click();
				}}
			>
				<NavLink
					className={({ isActive }: { isActive: boolean }) =>
						cn(
							'p-1 rounded-sm outline outline-2 transition-all ease-in-out hover:bg-border flex gap-x-5 justify-start items-center text-base text-center capitalize outline-transparent',

							{
								'outline-offset-2  bg-secondary text-ring outline-ring ':
									isActive,
							}
						)
					}
					id={link}
					to={link}
				>
					{iconList[index]}
					{link}
				</NavLink>
			</li>
		);
	});

	return routes;
}

function ProfileHeader() {
	return (
		<header className="flex items-start justify-between w-full">
			<div className="flex items-center justify-start gap-x-1 px-2 ">
				<Icons.logo className="w-10 h-10"></Icons.logo>
				<h3 className="scroll-m-20 text-2xl font-semibold mb-1 tracking-tight">
					Paysera
				</h3>
			</div>

			<ModeToggle></ModeToggle>
		</header>
	);
}

export default function TeamLeadNavigation() {
	const routeLinks: string[] = [
		'dashboard',
		'manage',
		'attendance',
		'schedule',
	];

	return (
		<nav className="bg-card boder-solid border-border border rounded-md h-full w-[230px]  p-3 gap-y-10 flex flex-col items-start justify-between">
			{/* unahin header */}
			<ProfileHeader></ProfileHeader>
			{/* then eto */}
			<ul className="flex-1 w-full">
				<p className="text-muted-foreground text-base font-semibold ml-2 ">
					Navigation
				</p>
				<RouteItems links={routeLinks} />
			</ul>
			{/* {then eto} */}
			<LogOutButton></LogOutButton>
		</nav>
	);
}
