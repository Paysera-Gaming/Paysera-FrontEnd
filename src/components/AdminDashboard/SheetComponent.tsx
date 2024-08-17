import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaList, FaEnvelope, FaCog, FaBullhorn } from 'react-icons/fa';
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
import '../../AdminDashboard/dialog-sheet.css';
import '../../AdminDashboard/general.css';
import '../../AdminDashboard/header.css';
import '../../AdminDashboard/links-logout.css';
import '../../AdminDashboard/profile.css';
import '../../AdminDashboard/settings.css';

const SheetComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinks = () => {
    const links = [
      { path: '/', label: 'Attendance', icon: <FaHome /> },
      // Update the path to reflect the `ManageTeams` folder
      { path: '/manageteams', label: 'Manage Teams', icon: <FaUsers /> },
      { path: '/employeelist', label: 'Employee List', icon: <FaList /> },
      { path: '/announcement', label: 'Announcement', icon: <FaBullhorn /> },
      { path: '/messages', label: 'Messages', icon: <FaEnvelope /> },
      { path: '/settings', label: 'Settings', icon: <FaCog /> },
    ];

    return links
      .filter(link => link.path !== currentPath)
      .map(link => (
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
          <ul>
            {renderLinks()}
          </ul>
          <ul className="logout-section">
            <li>Log Out</li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
