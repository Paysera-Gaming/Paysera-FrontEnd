import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, BookUser } from "lucide-react"
import { useUserStore } from "@/stores/userStore"

function returnRole(role: string): string {
  return role === "SUPER_ADMIN"
    ? "Super Admin"
    : role === "ADMIN"
      ? "Admin"
      : role === "TEAM_LEADER"
        ? "Team Leader"
        : "Employee"
}

function SuperAdminInfo() {
  const info = useUserStore.getState().user

  if (!info || info.accessLevel !== "ADMIN") {
    return <p>error</p>
  }

  return (
    <ul className="text-base space-y-1">
      <li>
        <b>Name:</b> {info.firstName} {info.middleName} {info.lastName}
      </li>
      <li>
        <b>Username:</b> {info.username}
      </li>
      <li>
        <b>Role:</b> <Badge className="text-sm px-2 py-1">{returnRole(info.accessLevel)}</Badge>
      </li>
    </ul>
  )
}

export default function SuperAdminInfoCard() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex-1 p-4 relative">
        <CardHeader className="pb-2 flex items-center justify-between flex-row relative">
          <CardTitle className="text-3xl font-semibold">Super Admin Info</CardTitle>
          <BookUser size={"1.8rem"} className="absolute top-2 right-2" />
        </CardHeader>
        <CardContent>
          <SuperAdminInfo />
        </CardContent>
      </Card>
      <Card className="border-primary text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out w-61 p-4 relative">
        <CardHeader className="pb-2 flex flex-row items-center justify-between relative">
          <CardTitle className="text-2xl font-semibold">Handbook</CardTitle>
          <Book size={"1.8rem"} className="absolute top-2 right-2" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-primary">Click here to open</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}