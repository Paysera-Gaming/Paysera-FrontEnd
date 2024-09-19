import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import { useQueryClient } from '@tanstack/react-query';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import { Attendance } from './types';
import { axiosInstance } from '@/api';

interface AttendanceActionsProps {
    attendance: Attendance;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({ attendance }) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState<Attendance>({
        ...attendance,
        timeIn: '08:00',
        timeOut: '17:00',
        lunchTimeIn: '13:00',
        lunchTimeOut: '14:00',
        overTimeTotal: 0,
    });

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axiosInstance.delete(`/api/attendance/${attendance.id}`);
            toast.success(`Successfully deleted attendance for ${attendance.employeeName} on ${attendance.date}`);
            setIsDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] });
        } catch (error) {
            toast.error('Error deleting the attendance.');
            console.error('Error deleting the attendance:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
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
            <DeleteDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                attendance={attendance}
            />
            <EditDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                editData={editData}
                setEditData={setEditData}
                attendance={attendance}
            />
        </>
    );
};

export default AttendanceActions;