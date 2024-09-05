import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (department: { name: string; teamLeader: string; schedule: string }) => void;
}

export default function AddDepartmentDialog({ isOpen, onClose, onAdd }: AddDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [startHour, setStartHour] = useState('8');
    const [startMinute, setStartMinute] = useState('00');
    const [startPeriod, setStartPeriod] = useState('AM');
    const [endHour, setEndHour] = useState('5');
    const [endMinute, setEndMinute] = useState('00');
    const [endPeriod, setEndPeriod] = useState('PM');

    const handleAdd = () => {
        const schedule = `${startHour}:${startMinute} ${startPeriod} - ${endHour}:${endMinute} ${endPeriod}`;
        if (name.trim() && teamLeader.trim() && schedule.trim()) {
            onAdd({ name, teamLeader, schedule });
            toast.success('Department added successfully!');
            setName('');
            setTeamLeader('');
            setStartHour('8');
            setStartMinute('00');
            setStartPeriod('AM');
            setEndHour('5');
            setEndMinute('00');
            setEndPeriod('PM');
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
                    <DialogTitle>Add Department</DialogTitle>
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
                    <Button onClick={handleAdd}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}