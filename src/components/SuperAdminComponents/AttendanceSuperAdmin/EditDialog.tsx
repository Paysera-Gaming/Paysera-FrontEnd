import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { parseTime, timeDifferenceInHours, formatDateTime } from './timeUtils';

import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Attendance } from './types';
import { axiosInstance } from '@/api';

interface EditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    editData: Attendance;
    setEditData: (data: Attendance) => void;
    attendance: Attendance;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, onClose, editData, setEditData, attendance }) => {
    const queryClient = useQueryClient();

    const handleEditSave = async (event: React.FormEvent) => {
        event.preventDefault();

        const timeIn = parseTime(editData.timeIn);
        const timeOut = parseTime(editData.timeOut);

        const totalWorkHours = timeDifferenceInHours(timeIn, timeOut);
        const overTimeTotal = editData.overTimeTotal || 0;
        const totalTime = totalWorkHours + overTimeTotal;

        const validWorkTimeTotal = totalWorkHours >= 0 ? totalWorkHours : null;

        const payload = {
            id: editData.id,
            employeeId: editData.employee.id,
            date: new Date(editData.date).toISOString(),
            status: editData.status,
            scheduleType: editData.scheduleType,
            timeIn: formatDateTime(editData.date, timeIn),
            timeOut: formatDateTime(editData.date, timeOut),
            timeHoursWorked: validWorkTimeTotal,
            overTimeTotal: overTimeTotal,
            timeTotal: totalTime.toFixed(2), // Format total time to two decimal places
        };

        try {
            await axiosInstance.put(`/api/attendance/${attendance.id}`, payload);
            toast.success(`Successfully updated attendance on ${attendance.date}`);
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] });
            onClose();
        } catch (error) {
            toast.error('Error updating the attendance.');
            console.error('Error updating the attendance:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit Attendance for {attendance.employee.lastName}, {attendance.employee.firstName}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSave} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="status" className="w-1/4 text-right text-gray-700 dark:text-gray-300">
                                Status
                            </Label>
                            <select
                                id="status"
                                className="w-3/4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                value={editData.status}
                                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                            >
                                <option value="ONGOING">ONGOING</option>
                                <option value="BREAK">BREAK</option>
                                <option value="DONE">DONE</option>
                                <option value="PAID_LEAVE">PAID_LEAVE</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="timeIn" className="w-1/4 text-right text-gray-700 dark:text-gray-300">
                                Time In
                            </Label>
                            <input
                                type="time"
                                id="timeIn"
                                className="w-3/4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                value={editData.timeIn}
                                onChange={(e) => setEditData({ ...editData, timeIn: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="timeOut" className="w-1/4 text-right text-gray-700 dark:text-gray-300">
                                Time Out
                            </Label>
                            <input
                                type="time"
                                id="timeOut"
                                className="w-3/4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                value={editData.timeOut}
                                onChange={(e) => setEditData({ ...editData, timeOut: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="overTimeTotal" className="w-1/4 text-right text-gray-700 dark:text-gray-300">
                                Overtime Total (hours)
                            </Label>
                            <input
                                type="number"
                                id="overTimeTotal"
                                className="w-3/4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                value={editData.overTimeTotal || ''}
                                onChange={(e) => setEditData({ ...editData, overTimeTotal: parseFloat(e.target.value) })}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600">
                            Cancel
                        </Button>
                        <Button type="submit" variant="default" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;