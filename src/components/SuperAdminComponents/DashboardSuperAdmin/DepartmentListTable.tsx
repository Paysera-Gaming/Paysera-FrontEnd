import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Department } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api"

function DepartmentListTable({ tableData }: { tableData: Department[] }) {
  const renderedList = tableData.map((department) => (
    <TableRow key={department.id}>
      <TableCell>{department.name}</TableCell>
      <TableCell>{department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}</TableCell>
      <TableCell>{department.Employees ? department.Employees.length : 0}</TableCell>
    </TableRow>
  ))

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>Department Name</TableHead>
          <TableHead>Leader</TableHead>
          <TableHead>Employee Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderedList}</TableBody>
    </Table>
  )
}

export default DepartmentListTable