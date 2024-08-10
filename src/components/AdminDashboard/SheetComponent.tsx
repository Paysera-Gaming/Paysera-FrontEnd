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
    if (currentPath === '/') {
      return (
        <>
          <li>
            <Link to="/yourteam">Your Team</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </>
      );
    } else if (currentPath === '/projects') {
      return (
        <>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/yourteam">Your Team</Link>
          </li>
        </>
      );
    } else if (currentPath === '/yourteam') {
      return (
        <>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </>
      );
    }
    return null;
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
            <li>Messages</li>
            <li>Settings</li>
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
