// src/components/AdminDashboard/SheetComponent.tsx

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import './SheetComponent.css';
  
  const SheetComponent = () => {
    return (
      <Sheet>
        <SheetTrigger className="sheet-trigger">Profile</SheetTrigger>
        <SheetContent className="sheet-content">
          <SheetHeader>
            <SheetTitle className="sheet-title">Profile Settings</SheetTitle>
            <SheetDescription className="sheet-description">
              Manage your account settings and preferences.
            </SheetDescription>
          </SheetHeader>
          <div className="profile-settings">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Log Out</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default SheetComponent;
  