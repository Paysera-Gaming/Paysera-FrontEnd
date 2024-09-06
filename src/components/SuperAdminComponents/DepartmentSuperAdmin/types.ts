export interface TeamMember {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface Schedule {
    startHour: string;
    startMinute: string;
    startPeriod: string;
    endHour: string;
    endMinute: string;
    endPeriod: string;
}

export interface Team {
    id: number;
    name: string;
    teamLeader: TeamMember | null;
    members: TeamMember[];
    schedule: Schedule;
}

export interface Department {
    id: number;
    name: string;
    totalTeams: number;
    teams: Team[];
}