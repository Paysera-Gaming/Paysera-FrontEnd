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
    
        // Parse the input times correctly
        const timeIn = new Date(`1970-01-01T${editData.timeIn}`);
        const timeOut = new Date(`1970-01-01T${editData.timeOut}`);
        const lunchTimeIn = new Date(`1970-01-01T${editData.lunchTimeIn}`);
        const lunchTimeOut = new Date(`1970-01-01T${editData.lunchTimeOut}`);
    
        // Calculate work time and lunch time in hours
        const workTimeTotal = (timeOut.getTime() - timeIn.getTime()) / (60 * 60 * 1000);
        const lunchTimeTotal = (lunchTimeOut.getTime() - lunchTimeIn.getTime()) / (60 * 60 * 1000);
        const overTimeTotal = editData.overTimeTotal ? editData.overTimeTotal : 0;
        const totalTime = workTimeTotal - lunchTimeTotal + overTimeTotal;
    
        // Ensure the date is correctly formatted
        const date = new Date(editData.date).toISOString().split('T')[0]; // Get the date part only
        const timeInISO = new Date(`${date}T${editData.timeIn}`).toISOString();
        const timeOutISO = new Date(`${date}T${editData.timeOut}`).toISOString();
        const lunchTimeInISO = new Date(`${date}T${editData.lunchTimeIn}`).toISOString();
        const lunchTimeOutISO = new Date(`${date}T${editData.lunchTimeOut}`).toISOString();
    
        const payload = {
            id: editData.id,
            employeeId: editData.employee.id, // Access employeeId correctly
            date: new Date(editData.date).toISOString(),
            status: editData.status,
            scheduleType: editData.scheduleType,
            timeIn: timeInISO,
            timeOut: timeOutISO,
            timeHoursWorked: workTimeTotal,
            overTimeTotal: editData.overTimeTotal,
            timeTotal: totalTime,
            lunchTimeIn: lunchTimeInISO,
            lunchTimeOut: lunchTimeOutISO,
            lunchTimeTotal: lunchTimeTotal,
        };
    
        try {
            await axios.put(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`, payload);
            toast.success(`Successfully updated attendance for ${attendance.employeeName} on ${attendance.date}`);
            setIsEditDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] }); // Invalidate the attendance query
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