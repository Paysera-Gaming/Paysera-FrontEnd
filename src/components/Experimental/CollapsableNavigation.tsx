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
				className="box-border"
				key={link}
				onClick={() => {
					document.getElementById(link)?.click();
				}}
			>
				<NavLink
					className={({ isActive }: { isActive: boolean }) =>
						cn(
							'rounded-sm outline outline-2 transition-all ease-in-out hover:bg-border flex justify-start items-center text-base text-center capitalize outline-transparent',

							{
								'group-hover:outline-offset-2  group-hover:bg-secondary text-ring outline-ring ':
									isActive,
							}
						)
					}
					id={link}
					to={link}
				>
					<div className="h-10 w-16 flex items-center justify-center ">
						{iconList[index]}
					</div>
					<div className="h-10 w-44 flex items-center justify-start">
						{routeNames[index]}
					</div>
				</NavLink>
			</li>
		);
	});

	return routes;
}
//240 - 64

// 176

function ProfileHeader() {
	return (
		<header className="flex items-start justify-center  ">
			<div className="w-16 h-16 flex items-center justify-center ">
				<Icons.logo className="w-10 h-10 "></Icons.logo>
			</div>
			<div className="h-16 w-44 flex items-center ">
				<h3 className=" scroll-m-20 text-2xl font-semibold mb-1 tracking-tight">
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
		<nav className="box-border overflow-hidden bg-secondary border-border shadow-md border rounded-md w-16  hover:w-60 h-[95svh] flex flex-col items-start justify-between min-h-0 transition-all ease-in-out absolute group">
			<div>
				<ProfileHeader></ProfileHeader>
				<div className="h-10 w-44 flex items-center px-1">
					<p className="text-transparent transition-all ease-in-out text-base font-semibold ml-2 group-hover:text-muted-foreground ">
						Navigation
					</p>
				</div>
				<ul className="box-border group-hover:px-2 transition-all ease-in-out h-16 w-60">
					<RouteItems links={routeLinks} routeNames={routeNames}></RouteItems>
				</ul>
			</div>
			<LogOutButton></LogOutButton>
		</nav>
	);
}
