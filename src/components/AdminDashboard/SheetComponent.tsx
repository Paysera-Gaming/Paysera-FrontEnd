import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import './SheetComponent.css';

const SheetComponent = () => {
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
            {/* <li>Dashboard</li> */}
            <li>Your Team</li>
            <li>Projects</li>
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
