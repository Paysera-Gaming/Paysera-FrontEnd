// types.ts
export interface Team {
    id: number;
    name: string;
    teamLeader?: {
        firstName: string;
        lastName: string;
        middleName?: string;
    };
    members: string[]; // Array of strings to represent member names
    schedule: {
        startHour: string;
        startMinute: string;
        startPeriod: string;
        endHour: string;
        endMinute: string;
        endPeriod: string;
    };
}

export interface Department {
    id: number;
    name: string;
    totalTeams: number;
    teams: Team[];
}