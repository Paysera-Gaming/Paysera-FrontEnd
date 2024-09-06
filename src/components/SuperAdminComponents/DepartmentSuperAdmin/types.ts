export interface TeamMember {
    firstName: string;
    middleName?: string;
    lastName: string;
    role: string; // Added role property
}

export interface Team {
    id: number;
    teamLeader: TeamMember | null;
    members: TeamMember[];
}

export interface Department {
    id: number;
    name: string;
    totalTeams: number;
    teams: Team[];
}