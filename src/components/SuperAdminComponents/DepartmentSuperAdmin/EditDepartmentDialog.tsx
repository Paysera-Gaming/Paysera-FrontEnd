import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EditDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (department: { id: number; name: string; teamLeader: string; schedule: string }) => void;
    department: { id: number; name: string; teamLeader: string; schedule: string } | null;
}

export default function EditDepartmentDialog({ isOpen, onClose, onEdit, department }: EditDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [startHour, setStartHour] = useState('8');
    const [startMinute, setStartMinute] = useState('00');
    const [startPeriod, setStartPeriod] = useState('AM');
    const [endHour, setEndHour] = useState('5');
    const [endMinute, setEndMinute] = useState('00');
    const [endPeriod, setEndPeriod] = useState('PM');

    useEffect(() => {
        if (department) {
            setName(department.name);
            setTeamLeader(department.teamLeader);
            if (department.schedule) {
                const [start, end] = department.schedule.split(' - ');
                const [startH, startM, startP] = start.split(/[: ]/);
                const [endH, endM, endP] = end.split(/[: ]/);
                setStartHour(startH);
                setStartMinute(startM);
                setStartPeriod(startP);
                setEndHour(endH);
                setEndMinute(endM);
                setEndPeriod(endP);
            }
        }
    }, [department]);

    const handleEdit = () => {
        const schedule = `${startHour}:${startMinute} ${startPeriod} - ${endHour}:${endMinute} ${endPeriod}`;
        if (name.trim() && teamLeader.trim()) {
            onEdit({ id: department!.id, name, teamLeader, schedule });
            toast.success('Department edited successfully!');
            onClose();
        } else {
            toast.error('Please fill out all required fields.');
        }
    };

    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const periods = ['AM', 'PM'];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Department Name</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Team Leader</label>
                        <Input
                            type="text"
                            value={teamLeader}
                            onChange={(e) => setTeamLeader(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Schedule</label>
                        <div className="flex space-x-2 mt-2">
                            <select value={startHour} onChange={(e) => setStartHour(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {hours.map(hour => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {minutes.map(minute => (
                                    <option key={minute} value={minute}>{minute}</option>
                                ))}
                            </select>
                            <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {periods.map(period => (
                                    <option key={period} value={period}>{period}</option>
                                ))}
                            </select>
                            <span className="self-center text-gray-700 dark:text-white">-</span>
                            <select value={endHour} onChange={(e) => setEndHour(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {hours.map(hour => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {minutes.map(minute => (
                                    <option key={minute} value={minute}>{minute}</option>
                                ))}
                            </select>
                            <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                                {periods.map(period => (
                                    <option key={period} value={period}>{period}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}