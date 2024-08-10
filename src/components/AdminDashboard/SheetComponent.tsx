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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SheetComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinks = () => {
    const links = [
      { path: '/', label: 'Dashboard' },
      { path: '/yourteam', label: 'Your Team' },
      { path: '/projects', label: 'Projects' },
      { path: '/messages', label: 'Messages' },
      { path: '/settings', label: 'Settings' },
    ];

    return links
      .filter(link => link.path !== currentPath)
      .map(link => (
        <li key={link.path}>
          <Link to={link.path}>{link.label}</Link>
        </li>
      ));
  };

  return (
    <Sheet>
      <SheetTrigger className="sheet-trigger">Profile</SheetTrigger>
      <SheetContent className="sheet-content">
        <SheetHeader>
          <Avatar className="profile-avatar">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
