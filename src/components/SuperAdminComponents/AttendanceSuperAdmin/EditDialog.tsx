import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { parseTime, timeDifferenceInHours, formatDateTime } from './timeUtils';
import axios from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Attendance } from './types';

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
        const lunchTimeIn = parseTime(editData.lunchTimeIn);
        const lunchTimeOut = parseTime(editData.lunchTimeOut);

        const lunchTimeTotal = timeDifferenceInHours(lunchTimeIn, lunchTimeOut);
        const totalWorkHours = timeDifferenceInHours(timeIn, timeOut);
        const workTimeTotal = totalWorkHours - lunchTimeTotal;
        const overTimeTotal = editData.overTimeTotal || 0;
        const totalTime = totalWorkHours + overTimeTotal;

        const validWorkTimeTotal = workTimeTotal >= 0 ? workTimeTotal : null;
        const validLunchTimeTotal = lunchTimeTotal >= 0 ? lunchTimeTotal : null;

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
            lunchTimeIn: formatDateTime(editData.date, lunchTimeIn),
            lunchTimeOut: formatDateTime(editData.date, lunchTimeOut),
            lunchTimeTotal: validLunchTimeTotal,
        };

        try {
            await axios.put(`${import.meta.env.VITE_BASE_API}/api/attendance/${attendance.id}`, payload);
            toast.success(`Successfully updated attendance for ${attendance.employeeName} on ${attendance.date}`);
            onClose();
            queryClient.invalidateQueries({ queryKey: ['attendanceList'] });
        } catch (error) {
            toast.error('Error updating the attendance.');
            console.error('Error updating the attendance:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
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
                                className="col-span-3 dark:bg-gray-800 dark:text-white"
                                value={editData.overTimeTotal || ''}
                                onChange={(e) => setEditData({ ...editData, overTimeTotal: parseFloat(e.target.value) })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="default">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;