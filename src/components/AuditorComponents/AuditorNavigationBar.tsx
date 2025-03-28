import {
  Home,
  Users,
  Calendar,
  // Briefcase,
  CheckSquare,
  Bell,
} from "lucide-react"; // Import necessary icons
import { Icons } from "@/icons/Icon";
// router
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

// logout component
import LogOutButton from "../LogoutComponent/LogoutButton";
import { ModeToggle } from "../ThemeProvider/ThemeSwitch";
import { cn } from "@/lib/utils";

interface RouteItemProps {
  links: string[];
}

// Rendering the routes list
function RouteItems({ links }: RouteItemProps): ReactNode {
  const iconList = [
    <Home key="home" />,
    <Bell key="announcement" />, // Use Bell icon for announcements
    <Calendar key="holidays" />, // Use Calendar icon for holidays
    <CheckSquare key="attendance" />, // Use CheckSquare icon for attendance
    <Users key="employee" />, // Use Users icon for employees
    // <Briefcase key="departments" />, // Use Briefcase icon for departments
  ];

  const routes = links.map((link, index) => {
    return (
      <li
        className="my-4" // Increased margin for higher spacing
        key={link}
        onClick={() => {
          document.getElementById(link)?.click();
        }}
      >
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            cn(
              "px-3 py-2 rounded-md outline outline-2 transition-all ease-in-out hover:bg-border flex gap-x-3 justify-start items-center text-base text-center capitalize outline-transparent",
              {
                "outline-offset-2 bg-secondary text-ring outline-ring":
                  isActive,
                "hover:outline-primary": !isActive,
              }
            )
          }
          id={link}
          to={`/Auditor/${link}`} // Ensure the path is correct
        >
          {iconList[index]}
          {link}
        </NavLink>
      </li>
    );
  });

  return routes;
}

function ProfileHeader() {
  return (
    <header className="flex items-center justify-between w-full mb-6">
      <div className="flex items-center gap-x-4 px-2">
        <Icons.logo className="w-8 h-8" /> {/* Reduced size */}
        <h3 className="text-xl font-semibold tracking-tight">
          {" "}
          {/* Reduced size */}
          Paysera
        </h3>
      </div>
      <ModeToggle />
    </header>
  );
}

export default function AuditorNavigation() {
  const routeLinks: string[] = [
    "dashboard",
    "announcement",
    "holidays",
    "attendance",
    "employee",
    // "departments",
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-card border-solid border-border border rounded-md h-[calc(100vh-40px)] w-[250px] p-5 flex flex-col fixed top-5 left-5 z-50">
        {/* Profile header at the top */}
        <ProfileHeader />

        {/* Navigation links */}
        <div className="flex-1 w-full mt-10 overflow-y-auto px-2">
          <p className="text-muted-foreground text-base font-semibold ml-2 mb-4">
            Navigation
          </p>
          <ul>
            <RouteItems links={routeLinks} />
          </ul>
        </div>

        {/* Logout button at the bottom */}
        <LogOutButton />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 ml-[250px] p-1 bg-background">
        {/* This is where the routes or content will be rendered */}
        {/* Add your page content here */}
      </main>
    </div>
  );
}
