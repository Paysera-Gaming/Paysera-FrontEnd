import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface Employee {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: string;
    accessLevel: string;
    isActive: boolean;
}

interface Attendance {
    id: number;
    date: string;
    employeeName: string;
    status: string;
    scheduleType: string;
    timeIn: string;
    timeOut: string;
    lunchTimeIn: string;
    lunchTimeOut: string;
    overTimeTotal: number | null; // Allow null
    timeTotal: number;
    employee: Employee;
}

interface AttendanceActionsProps {
    attendance: Attendance;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({ attendance }) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState(attendance);

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`);
            toast.success(`Successfully deleted attendance for ${attendance.employeeName} on ${attendance.date}`);
            setIsDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] }); // Invalidate the attendance query
        } catch (error) {
            toast.error('Error deleting the attendance.');
            console.error('Error deleting the attendance:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditSave = async (event: React.FormEvent) => {
        event.preventDefault();

        // Helper function to parse 12-hour time format to 24-hour military time
        const parseTime = (time: string) => {
            const [hours, minutes] = time.split(/[: ]/);
            const period = time.slice(-2); // AM or PM
            let hours24 = parseInt(hours, 10);

            if (period === 'PM' && hours24 !== 12) hours24 += 12;
            if (period === 'AM' && hours24 === 12) hours24 = 0;

            return { hours: hours24, minutes: parseInt(minutes) };
        };

        // Function to calculate the difference between two times in hours
        const timeDifferenceInHours = (startTime: { hours: number, minutes: number }, endTime: { hours: number, minutes: number }) => {
            const startMinutes = startTime.hours * 60 + startTime.minutes;
            const endMinutes = endTime.hours * 60 + endTime.minutes;
            const diffInMinutes = endMinutes - startMinutes;

            return diffInMinutes / 60; // Return the difference in hours
        };

        // Parse times
        const timeIn = parseTime(editData.timeIn); // e.g., 08:00 AM
        const timeOut = parseTime(editData.timeOut); // e.g., 05:00 PM
        const lunchTimeIn = parseTime(editData.lunchTimeIn); // e.g., 01:00 PM
        const lunchTimeOut = parseTime(editData.lunchTimeOut); // e.g., 02:00 PM

        // Calculate Lunch Time Total (time between Lunch Time In and Lunch Time Out)
        const lunchTimeTotal = timeDifferenceInHours(lunchTimeIn, lunchTimeOut);

        // Calculate total work hours (time between Time In and Time Out)
        const totalWorkHours = timeDifferenceInHours(timeIn, timeOut);

        // Calculate Work Time Total (total work hours minus lunch break)
        const workTimeTotal = totalWorkHours - lunchTimeTotal;

        // Total time in the office (should equal the difference between Time In and Time Out)
        const totalTime = totalWorkHours; // Total time spent at work including the lunch break

        // Set to null if calculations are incorrect
        const validWorkTimeTotal = workTimeTotal >= 0 ? workTimeTotal : null;
        const validLunchTimeTotal = lunchTimeTotal >= 0 ? lunchTimeTotal : null;

        // Format the date-time to ISO format for saving (optional)
        const formatDateTime = (date: string, time: { hours: number, minutes: number }) => {
            const dateObj = new Date(date);
            dateObj.setHours(time.hours, time.minutes, 0, 0);
            return dateObj.toISOString();
        };

        const payload = {
            id: editData.id,
            employeeId: editData.employee.id,
            date: new Date(editData.date).toISOString(),
            status: editData.status,
            scheduleType: editData.scheduleType,
            timeIn: formatDateTime(editData.date, timeIn),
            timeOut: formatDateTime(editData.date, timeOut),
            timeHoursWorked: validWorkTimeTotal, // Work time excluding lunch
            overTimeTotal: editData.overTimeTotal,
            timeTotal: totalTime.toFixed(2), // Total time (including lunch)
            lunchTimeIn: formatDateTime(editData.date, lunchTimeIn),
            lunchTimeOut: formatDateTime(editData.date, lunchTimeOut),
            lunchTimeTotal: validLunchTimeTotal, // Total lunch time
        };

        try {
            await axios.put(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`, payload);
            toast.success(`Successfully updated attendance for ${attendance.employeeName} on ${attendance.date}`);
            setIsEditDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] });
        } catch (error) {
            toast.error('Error updating the attendance.');
            console.error('Error updating the attendance:', error);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the attendance for {attendance.employeeName} on {attendance.date}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Attendance</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditSave}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <select
                                    id="status"
                                    className="col-span-3"
                                    value={editData.status}
                                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                >
                                    <option value="ONGOING">ONGOING</option>
                                    <option value="BREAK">BREAK</option>
                                    <option value="DONE">DONE</option>
                                    <option value="PAID_LEAVE">PAID_LEAVE</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="timeIn" className="text-right">
                                    Time In
                                </Label>
                                <input
                                    type="time"
                                    id="timeIn"
                                    className="col-span-3"
                                    value={editData.timeIn}
                                    onChange={(e) => setEditData({ ...editData, timeIn: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="timeOut" className="text-right">
                                    Time Out
                                </Label>
                                <input
                                    type="time"
                                    id="timeOut"
                                    className="col-span-3"
                                    value={editData.timeOut}
                                    onChange={(e) => setEditData({ ...editData, timeOut: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lunchTimeIn" className="text-right">
                                    Lunch Time In
                                </Label>
                                <input
                                    type="time"
                                    id="lunchTimeIn"
                                    className="col-span-3"
                                    value={editData.lunchTimeIn}
                                    onChange={(e) => setEditData({ ...editData, lunchTimeIn: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lunchTimeOut" className="text-right">
                                    Lunch Time Out
                                </Label>
                                <input
                                    type="time"
                                    id="lunchTimeOut"
                                    className="col-span-3"
                                    value={editData.lunchTimeOut}
                                    onChange={(e) => setEditData({ ...editData, lunchTimeOut: e.target.value })} 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="overTimeTotal" className="text-right">
                                    Overtime Total (hours)
                                </Label>
                                <input
                                    type="number"
                                    id="overTimeTotal"
                                    className="col-span-3"
                                    value={editData.overTimeTotal || ''}
                                    onChange={(e) => setEditData({ ...editData, overTimeTotal: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" variant="default">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AttendanceActions;