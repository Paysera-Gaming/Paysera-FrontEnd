import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
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
        </>
    );
};

export default AttendanceActions;