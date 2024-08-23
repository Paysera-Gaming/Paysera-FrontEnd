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
import { CalendarDays, UsersRound, Settings, Building, Megaphone, LogOut } from 'lucide-react';

// Import CSS files for styling
import '../../css/AdminDashboard/dialog-sheet.css';
import '../../css/AdminDashboard/header.css';
import '../../css/AdminDashboard/links-logout.css';
import '../../css/AdminDashboard/profile.css';
import '../../css/AdminDashboard/settings.css';

const SheetComponent = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	const renderLinks = () => {
		const links = [
			{ path: '/admin/dashboard', label: 'Attendance', icon: <CalendarDays /> },
			{ path: '/admin/manageteams', label: 'Manage Teams', icon: <Building /> },
			{ path: '/admin/employeelist', label: 'Employee List', icon: <UsersRound /> },
			{ path: '/admin/announcement', label: 'Announcement', icon: <Megaphone /> },
			{ path: '/admin/accountpreferences', label: 'Settings', icon: <Settings /> },
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
						<li className="link-item">
							<Link to="/logout" className="link-content sheet-button">
								<LogOut className="logout-icon" />
								<span className="logout-text">Log Out</span>
							</Link>
						</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetComponent;
