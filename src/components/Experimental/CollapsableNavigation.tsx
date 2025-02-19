import {
	Home,
	Calendar,
	FolderKanban,
	UserCheck,
	UsersIcon,
	AlarmClockPlus,
} from 'lucide-react';
import { Icons } from '@/icons/Icon';
// router
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

// logout component

import LogOutButton from '../LogoutComponent/LogoutButton';

import { ModeToggle } from '../ThemeProvider/ThemeSwitch';
import '../../index.css';
import { cn } from '@/lib/utils';
interface RouteItemProps {
	links: string[];
	routeNames: string[];
}

function RouteItems({ links, routeNames }: RouteItemProps): ReactNode {
	const iconList = [
		<Home></Home>,
		<FolderKanban></FolderKanban>,
		<UserCheck></UserCheck>,
		<Calendar></Calendar>,
		<UsersIcon></UsersIcon>,
		<AlarmClockPlus></AlarmClockPlus>,
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
					{routeNames[index]}
				</NavLink>
			</li>
		);
	});

	return routes;
}

function ProfileHeader() {
	return (
		// <header className="border-border border-dashed border-b w-full pb-2">
		// 	<div className="flex items-center justify-start gap-3">
		// 		<Icons.logo className="w-10 h-10"></Icons.logo>
		// 		<h3 className="scroll-m-20 text-2xl font-semibold mb-1 tracking-tight">
		// 			Paysera
		// 		</h3>
		// 	</div>
		// 	{/* <div className="flex items-center gap-5 w-auto">
		// 		<ModeToggle></ModeToggle>
		// 		<p>Mode</p>
		// 	</div> */}
		// </header>

		<header className="flex items-start justify-center py-5">
			<div className="pl-5">
				<Icons.logo className="w-10 h-10"></Icons.logo>
			</div>
			<div className="px-5">
				<h3 className="className='p-5' scroll-m-20 text-2xl font-semibold mb-1 tracking-tight">
					Paysera
				</h3>
			</div>
		</header>
	);
}

export default function CollapsableNavigation() {
	const routeLinks: string[] = [
		'dashboard',
		'manage',
		'attendance',
		'schedule',
		'personal',
		'overtime',
	];

	const routeNames: string[] = [
		'Dashboard',
		'Manage Employees',
		'Attendance History',
		'Role Schedules',
		'Personal Schedules',
		'Overtime Approval',
	];

	return (
		<nav className="overflow-hidden bg-secondary border-border shadow-md border rounded-md w-[75px] hover:w-[225px] h-[95svh] flex  items-start justify-between min-h-0 transition-all ease-in-out absolute group">
			<ProfileHeader></ProfileHeader>
			<div></div>
		</nav>
	);
}
