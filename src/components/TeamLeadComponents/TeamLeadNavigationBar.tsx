// button
import { Button } from '@/components/ui/button';

import { Home, Calendar, FolderKanban, UserCheck, LogOut } from 'lucide-react';
import { Icons } from '@/icons/Icon';
// router
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

// logout component
import LogOutButton from '../LogoutComponent/LogoutButton';

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
				className=" p-1 w-auto rounded-sm border-primary transition-colors ease-in-out hover:bg-border my-2 flex gap-x-3 justify-start items-center"
				key={link}
				onClick={() => {
					document.getElementById(link)?.click();
				}}
			>
				{iconList[index]}
				<NavLink className="text-lg text-center capitalize" id={link} to={link}>
					{link}
				</NavLink>
			</li>
		);
	});

	return routes;
}
// this is some magic text
function ProfileHeader() {
	return (
		<header>
			<span className="flex items-center justify-start ">
				<Icons.logo className="w-10 h-10"></Icons.logo>
				<span>
					<h3 className="scroll-m-20 text-2xl font-semibold  tracking-tight">
						Paysera
					</h3>
					<p className=" text-sm text-muted-foreground">Good morning John!</p>
				</span>
			</span>
		</header>
	);
}

// function LogOutButton() {
// 	// TODO: add a modal for confirmation
// 	const navigate = useNavigate();

// 	function logOutUser() {
// 		navigate('/login');
// 	}

// 	return (
// 		// add modal here
// 		<Button variant={'outline'} onClick={logOutUser} className="gap-2 w-full">
// 			<LogOut></LogOut>
// 			<p>Logout</p>
// 		</Button>
// 	);
// }

export default function TeamLeadNavigation() {
	const routeLinks: string[] = [
		'dashboard',
		'manage',
		'attendance',
		'schedule',
	];

	return (
		<nav className="bg-card boder-solid border-border border rounded-md h-full p-2 gap-y-10 w-60 flex flex-col items-start justify-between">
			{/* unahin header */}
			<ProfileHeader></ProfileHeader>
			{/* then eto */}
			<ul className="flex-1 w-full">
				<RouteItems links={routeLinks} />
			</ul>
			{/* {then eto} */}
			<LogOutButton></LogOutButton>
		</nav>
	);
}
