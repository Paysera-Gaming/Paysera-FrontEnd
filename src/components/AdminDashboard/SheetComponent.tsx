import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, UsersRound, Settings, Building, Megaphone, LogOut } from 'lucide-react'; // Importing CalendarDays, UsersRound, Settings, Building, Megaphone, and LogOut

// Import CSS files for styling
import '../../css/AdminDashboard/dialog-sheet.css';
import '../../css/AdminDashboard/header.css';
import '../../css/AdminDashboard/links-logout.css';
import '../../css/AdminDashboard/profile.css';
import '../../css/AdminDashboard/settings.css';

const SheetComponent = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	// Debugging to check the current path
	console.log('Current Path:', currentPath);

	const renderLinks = () => {
		const links = [
			{ path: '/admin/dashboard', label: 'Attendance', icon: <CalendarDays /> }, // CalendarDays icon
			{ path: '/admin/manageteams', label: 'Manage Teams', icon: <Building /> }, // Building icon
			{ path: '/admin/employeelist', label: 'Employee List', icon: <UsersRound /> }, // UsersRound icon
			{ path: '/admin/announcement', label: 'Announcement', icon: <Megaphone /> }, // Megaphone icon
			{ path: '/admin/accountpreferences', label: 'Settings', icon: <Settings /> }, // Settings icon
		];

		return links
			.filter((link) => !currentPath.includes(link.path))
			.map((link) => (
				<li key={link.path} className="link-item">
					<Link to={link.path} className="link-content sheet-button">
						{link.icon}
						<span>{link.label}</span>
					</Link>
				</li>
			));
	};

	return (
		<Sheet>
			<SheetTrigger className="sheet-trigger">Profile</SheetTrigger>
			<SheetContent className="sheet-content">
				<SheetHeader>
					<div className="profile-info">
						<Avatar className="profile-avatar">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="profile-info-text">
							<div className="username">Admin</div>
							<div className="user-role">Administrator</div>
						</div>
					</div>
					<SheetTitle className="sheet-title">Profile Settings</SheetTitle>
					<SheetDescription className="sheet-description">
						Manage your account settings and preferences.
					</SheetDescription>
				</SheetHeader>
				<div className="profile-settings">
					<ul>{renderLinks()}</ul>
					<ul className="logout-section">
						<li>
							<LogOut /> Log Out
						</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetComponent;
