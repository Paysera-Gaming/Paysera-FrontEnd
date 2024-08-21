import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaUsers, FaList, FaEnvelope, FaCog, FaBullhorn } from 'react-icons/fa';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
			{ path: '/admin', label: 'Attendance', icon: <div className="FaHome" /> },
			// Update the path to reflect the `ManageTeams` folder
			{
				path: '/admin/manageteams',
				label: 'Manage Teams',
				icon: <div className="FaUsers" />,
			},
			{
				path: '/admin/employeelist',
				label: 'Employee List',
				icon: <div className="FaList" />,
			},
			{
				path: '/admin/announcement',
				label: 'Announcement',
				icon: <div className="FaBullhorn" />,
			},
			{
				path: '/admin/accountpreferences',
				label: 'Settings',
				icon: <div className="FaCog" />,
			},
		];

		return links
			.filter((link) => link.path !== currentPath)
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
						<li>Log Out</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetComponent;
