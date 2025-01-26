    import React, { useState } from "react"
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
    import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
    
    const OvertimeTable: React.FC = () => {
      const [data, setData] = useState<Attendance[]>([])
      const [searchTerm, setSearchTerm] = useState("")
      const [selectedStatus, setSelectedStatus] = useState("")
      const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
      const [currentAttendance, setCurrentAttendance] = useState<Attendance | null>(null)
      const [newStatus, setNewStatus] = useState<string>("")
    
      const handleStatusChange = (id: number, newStatus: string) => {
        setCurrentAttendance(data.find((attendance) => attendance.id === id) || null)
        setNewStatus(newStatus)
        setIsConfirmationOpen(true)
      }
    
      const confirmStatusChange = () => {
        if (currentAttendance) {
          const updatedData = data.map((attendance) =>
            attendance.id === currentAttendance.id ? { ...attendance, status: newStatus } : attendance
          )
          setData(updatedData)
          setIsConfirmationOpen(false)
        }
      }
    
      const filteredData = data.filter(
        (attendance) =>
          attendance.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedStatus ? attendance.status === selectedStatus : true)
      )
    
      return (
        <>
          <div className="flex mb-4 space-x-2 p-4">
            <Input
              type="text"
              placeholder="Search by employee name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-2 text-base w-48">
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem onSelect={() => setSelectedStatus("")}>All</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedStatus("PENDING")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedStatus("ACCEPTED")}>Accepted</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedStatus("REJECTED")}>Rejected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Overtime Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.employeeName}</TableCell>
                  <TableCell>{attendance.overTimeTotal}</TableCell>
                  <TableCell>{attendance.status}</TableCell>
                  <TableCell>
                    {attendance.status === "PENDING" && (
                      <>
                        <Button onClick={() => handleStatusChange(attendance.id, "ACCEPTED")} className="mr-2">
                          Accept
                        </Button>
                        <Button onClick={() => handleStatusChange(attendance.id, "REJECTED")} variant="destructive">
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    
          <Dialog open={isConfirmationOpen} onOpenChange={() => setIsConfirmationOpen(false)}>
            <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Confirmation
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 text-gray-700 dark:text-gray-300">
                Are you sure this employee is allowed to overtime?
              </div>
              <DialogFooter className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsConfirmationOpen(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600">
                  Cancel
                </Button>
                <Button type="button" variant="default" onClick={confirmStatusChange} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )
    }
    
    export default OvertimeTable