// src/components/CalendarComponent.tsx

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"; // Adjust the path accordingly

export function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="calendar-button">Open Calendar</button>
            </DialogTrigger>
            <DialogContent className="dialog-content">
                <DialogHeader>
                    <DialogTitle>Select a Date</DialogTitle>
                    <DialogDescription>
                        Choose a date from the calendar to manage your schedule.
                    </DialogDescription>
                </DialogHeader>
                <div className="calendar-container">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
