import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookUser, Calendar } from "lucide-react";
import { useUserStore } from "@/stores/userStore";

function returnRole(role: string): string {
  return role === "SUPER_ADMIN"
    ? "Super Admin"
    : role === "ADMIN"
    ? "Admin"
    : role === "TEAM_LEADER"
    ? "Team Leader"
    : "Employee";
}

function SuperAdminInfo() {
  const info = useUserStore.getState().user;

  if (!info || info.accessLevel !== "ADMIN") {
    return <p>error</p>;
  }

  return (
    <ul className="text-sm space-y-1">
      <li>
        <b>Name:</b> {info.firstName} {info.middleName} {info.lastName}
      </li>
      <li>
        <b>Username:</b> {info.username}
      </li>
      <li>
        <b>Role:</b> <Badge className="text-xs px-2 py-1">{returnRole(info.accessLevel)}</Badge>
      </li>
    </ul>
  );
}

function ScheduleInfo() {
  return (
    <ul className="text-sm space-y-0">
      <li>
        <b>Schedule Type:</b> SUPER FLEXI
      </li>
      <li>
        <b>Schedule Info:</b> Anytime
      </li>
    </ul>
  );
}

type SuperAdminInfoCardProps = {
  className?: string;
};

export default function SuperAdminInfoCard({ className }: SuperAdminInfoCardProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Card className="flex-1 p-2 relative">
        <CardHeader className="pb-1 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Super Admin Info</CardTitle>
          <BookUser size={"1.5rem"} />
        </CardHeader>
        <CardContent>
          <SuperAdminInfo />
        </CardContent>
      </Card>
      <Card className="flex-1 p-2 relative">
        <CardHeader className="pb-1 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Schedule Info</CardTitle>
          <Calendar size={"1.5rem"} />
        </CardHeader>
        <CardContent>
          <ScheduleInfo />
        </CardContent>
      </Card>
      <Card className="border-primary text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out w-61 p-2 relative">
        <CardHeader className="pb-1 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Paysera Handbook</CardTitle>
          <Book size={"1.5rem"} />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-primary">Click here to open</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}