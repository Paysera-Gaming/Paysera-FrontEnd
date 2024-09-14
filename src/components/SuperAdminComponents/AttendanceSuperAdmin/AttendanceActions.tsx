import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';

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
    overTimeTotal: number | null;
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