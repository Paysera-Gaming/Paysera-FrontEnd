import { Link, useLocation } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { CalendarDays, UsersRound, Settings, Building, LogOut, CircleUser } from 'lucide-react';

// Import the Paysera logo
import PayseraLogo from '/PayseraIcon.svg';

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
            <SheetContent aria-describedby="" className="sheet-content">
                <SheetHeader className="header-container">
                    {/* Centered Paysera Logo and Name */}
                    <div className="paysera-header">
                        <img src={PayseraLogo} alt="Paysera Logo" className="paysera-logo" />
                        <div className="paysera-name">Paysera</div>
                    </div>

                    {/* Left-aligned Profile Information */}
                    <div className="profile-info-container">
                        <CircleUser className="profile-avatar" size={48} />
                        <div className="profile-text">
                            <div className="username">Admin</div>
                            <div className="user-role">Administrator</div>
                        </div>
                    </div>
                </SheetHeader>
                <SheetTitle className="sheet-title">Profile Settings</SheetTitle>
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