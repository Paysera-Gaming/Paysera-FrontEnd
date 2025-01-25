import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"

function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
  const sortedData = tableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
  )
}

export default RecentActivitiesTable