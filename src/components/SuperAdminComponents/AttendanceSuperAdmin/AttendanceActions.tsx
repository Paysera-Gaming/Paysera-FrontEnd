import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

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
}

interface AttendanceActionsProps {
    attendance: Attendance;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({ attendance }) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState<Attendance | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

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

    const handleEditClick = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`);
            setEditData(response.data);
            setSelectedDate(new Date(response.data.date));
            setIsEditDialogOpen(true);
        } catch (error) {
            toast.error('Error fetching the attendance data.');
            console.error('Error fetching the attendance data:', error);
        }
    };

    const handleEditSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editData || !selectedDate) return;

        const date = selectedDate.toISOString().split('T')[0]; // Get the date part only

        const payload = {
            ...editData,
            date: selectedDate.toISOString(),
            timeIn: new Date(`${date}T${editData.timeIn}`).toISOString(),
            timeOut: new Date(`${date}T${editData.timeOut}`).toISOString(),
            lunchTimeIn: new Date(`${date}T${editData.lunchTimeIn}`).toISOString(),
            lunchTimeOut: new Date(`${date}T${editData.lunchTimeOut}`).toISOString(),
        };

        try {
            await axios.put(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`, payload);
            toast.success(`Successfully updated attendance for ${attendance.employeeName} on ${attendance.date}`);
            setIsEditDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] }); // Invalidate the attendance query
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                const messages = error.response.data.message.map((err: any) => err.message);
                setErrorMessages(messages);
            } else {
                toast.error('Error updating the attendance.');
                console.error('Error updating the attendance:', error);
            }
        }
    };

    const calculateTotalTime = () => {
        if (!editData) return;

        const timeIn = new Date(`1970-01-01T${editData.timeIn}:00`);
        const timeOut = new Date(`1970-01-01T${editData.timeOut}:00`);
        const lunchTimeIn = new Date(`1970-01-01T${editData.lunchTimeIn}:00`);
        const lunchTimeOut = new Date(`1970-01-01T${editData.lunchTimeOut}:00`);
        const overTimeTotal = editData.overTimeTotal || 0;

        const workHours = (timeOut.getTime() - timeIn.getTime()) / (1000 * 60 * 60);
        const lunchHours = (lunchTimeOut.getTime() - lunchTimeIn.getTime()) / (1000 * 60 * 60);
        const totalTime = workHours - lunchHours + overTimeTotal;

        setEditData({ ...editData, timeTotal: totalTime });
    };

    useEffect(() => {
        calculateTotalTime();
    }, [editData?.timeIn, editData?.timeOut, editData?.lunchTimeIn, editData?.lunchTimeOut, editData?.overTimeTotal]);

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
                    {editData && (
                        <form onSubmit={handleEditSave}>
                            <div className="space-y-4">
                                {errorMessages.length > 0 && (
                                    <div className="text-red-500">
                                        {errorMessages.map((message, index) => (
                                            <div key={index}>{message}</div>
                                        ))}
                                    </div>
                                )}
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
                                    <Label htmlFor="scheduleType" className="text-right">
                                        Schedule Type
                                    </Label>
                                    <select
                                        id="scheduleType"
                                        className="col-span-3"
                                        value={editData.scheduleType}
                                        onChange={(e) => setEditData({ ...editData, scheduleType: e.target.value })}
                                    >
                                        <option value="FIXED">FIXED</option>
                                        <option value="FLEXI">FLEXI</option>
                                        <option value="SUPER_FLEXI">SUPER_FLEXI</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="timeIn" className="text-right">
                                        Time In
                                    </Label>
                                    <input
                                        id="timeIn"
                                        type="time"
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
                                        id="timeOut"
                                        type="time"
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
                                        id="lunchTimeIn"
                                        type="time"
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
                                        id="lunchTimeOut"
                                        type="time"
                                        className="col-span-3"
                                        value={editData.lunchTimeOut}
                                        onChange={(e) => setEditData({ ...editData, lunchTimeOut: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="overTimeTotal" className="text-right">
                                        Overtime (hours)
                                    </Label>
                                    <input
                                        id="overTimeTotal"
                                        type="number"
                                        className="col-span-3"
                                        value={editData.overTimeTotal ?? 0} // Handle null case
                                        onChange={(e) => setEditData({ ...editData, overTimeTotal: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="totalTime" className="text-right">
                                        Total Time (hours)
                                    </Label>
                                    <input
                                        id="totalTime"
                                        type="number"
                                        className="col-span-3"
                                        value={editData.timeTotal}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" variant="default">Save</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AttendanceActions;