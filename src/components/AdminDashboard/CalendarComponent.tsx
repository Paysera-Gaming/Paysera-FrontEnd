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
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());

    const handleApply = () => {
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', // Use 'short' for abbreviated month names
            day: 'numeric',
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="calendar-button" style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#4A90E2', 
                    color: '#FFFFFF', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    transition: 'background-color 0.2s ease',
                }}>
                    Select Dates
                </button>
            </DialogTrigger>
            <DialogContent style={{ 
                maxWidth: '600px', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
                backgroundColor: '#FFFFFF',
            }}>
                <DialogHeader>
                    <DialogTitle style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        marginBottom: '10px', 
                        textAlign: 'center',
                        color: '#333333',
                    }}>
                        Select Dates
                    </DialogTitle>
                    <DialogDescription style={{ 
                        fontSize: '14px', 
                        color: '#666666', 
                        marginBottom: '20px', 
                        textAlign: 'center',
                    }}>
                        Choose the start and end dates for your schedule.
                    </DialogDescription>
                </DialogHeader>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    gap: '16px' 
                }}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ 
                            marginBottom: '8px', 
                            textAlign: 'center', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: '#333333',
                        }}>
                            Start Date
                        </h4>
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            className="rounded-md border"
                            style={{ 
                                padding: '10px', 
                                borderRadius: '4px', 
                                borderColor: '#E0E0E0', 
                                backgroundColor: '#FAFAFA'
                            }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ 
                            marginBottom: '8px', 
                            textAlign: 'center', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: '#333333',
                        }}>
                            End Date
                        </h4>
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            className="rounded-md border"
                            style={{ 
                                padding: '10px', 
                                borderRadius: '4px', 
                                borderColor: '#E0E0E0', 
                                backgroundColor: '#FAFAFA'
                            }}
                        />
                    </div>
                </div>
                <div style={{ 
                    marginTop: '20px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    color: '#555555' 
                }}>
                    <p><strong>Start:</strong> {formatDate(startDate)}</p>
                    <p><strong>End:</strong> {formatDate(endDate)}</p>
                </div>
                <div style={{ 
                    marginTop: '24px', 
                    textAlign: 'center' 
                }}>
                    <button
                        onClick={handleApply}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#4A90E2',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#357ABD')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4A90E2')}
                    >
                        Apply
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
