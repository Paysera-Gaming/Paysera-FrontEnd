// src/components/CalendarComponent.tsx

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export function CalendarComponent() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="calendar-container">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
    );
}
