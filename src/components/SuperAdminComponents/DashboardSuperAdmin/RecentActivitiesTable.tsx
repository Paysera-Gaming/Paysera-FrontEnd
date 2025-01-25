import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"

function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("")

  const filteredData = tableData.filter(
    (data) =>
      data.employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAccessLevel
        ? selectedAccessLevel === "ADMIN"
          ? ["SUPER_ADMIN", "ADMIN"].includes(data.employee.accessLevel)
          : data.employee.accessLevel === selectedAccessLevel
        : true),
  )

  const sortedData = filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const renderedList = sortedData.map((data) => {
    const parsedDate = new Date(data.date)
    const formattedDate = parsedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    const formattedTime = parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return (
      <TableRow key={data.id}>
        <TableCell>{data.employee.username}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>{formattedTime}</TableCell>
        <TableCell>{data.timeTotal} hours</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <div className="flex mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              Access Level
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("")}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>Super Admin</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}>Team Leader</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("EMPLOYEE")}>Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-y-auto h-[300px]">
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderedList}</TableBody>
        </Table>
      </div>
    </>
  )
}

export default RecentActivitiesTable