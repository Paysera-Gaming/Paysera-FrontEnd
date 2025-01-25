import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"

function EmployeeListTable({ tableData }: { tableData: Employee[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const filteredData = tableData.filter(
    (employee) =>
      employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAccessLevel ? employee.accessLevel === selectedAccessLevel : true) &&
      (selectedStatus ? (selectedStatus === "Online" ? employee.isActive : !employee.isActive) : true),
  )

  const sortedData = filteredData.sort((a, b) => b.id - a.id)

  const renderedList = sortedData.map((employee) => (
    <TableRow key={employee.id}>
      <TableCell>{employee.username}</TableCell>
      <TableCell>{employee.accessLevel}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${employee.isActive ? "bg-green-600" : "bg-red-600"}`}></div>
          <span>{employee.isActive ? "Online" : "Offline"}</span>
        </div>
      </TableCell>
    </TableRow>
  ))

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
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("SUPER_ADMIN")}>Super Admin</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>Admin</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}>Team Leader</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("EMPLOYEE")}>Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setSelectedStatus("")}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("Online")}>Online</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("Offline")}>Offline</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Access Level</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderedList}</TableBody>
      </Table>
    </>
  )
}

export default EmployeeListTable