import type { Department } from './DepartmentList';

// Constants for random name generation
const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Emily', 'Chris', 'Jessica', 'David', 'Sarah'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'];
const MIDDLE_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Utility function to get a random element from an array
const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a random name
const generateRandomName = () => ({
    firstName: getRandomElement(FIRST_NAMES),
    lastName: getRandomElement(LAST_NAMES),
    middleName: getRandomElement(MIDDLE_NAMES),
});

// Function to generate a list of random members
const generateRandomMembers = (count: number) => {
    const members = [];
    for (let i = 0; i < count; i++) {
        members.push(generateRandomName());
    }
    return members;
};

// Sample department data with multiple departments and teams
const sampleDepartments: Department[] = [
    {
        id: 1,
        name: 'Human Resources',
        totalTeams: 1,
        teams: [
            {
                id: 1,
                name: 'Recruitment',
                teamLeader: generateRandomName(),
                members: generateRandomMembers(5),
                schedule: {
                    startHour: '8',
                    startMinute: '00',
                    startPeriod: 'AM',
                    endHour: '5',
                    endMinute: '00',
                    endPeriod: 'PM'
                }
            }
        ]
    },
    {
        id: 2,
        name: 'Engineering',
        totalTeams: 1,
        teams: [
            {
                id: 1,
                name: 'Development',
                teamLeader: generateRandomName(),
                members: generateRandomMembers(6),
                schedule: {
                    startHour: '9',
                    startMinute: '00',
                    startPeriod: 'AM',
                    endHour: '6',
                    endMinute: '00',
                    endPeriod: 'PM'
                }
            }
        ]
    },
    {
        id: 3,
        name: 'Marketing',
        totalTeams: 1,
        teams: [
            {
                id: 1,
                name: 'Content Creation',
                teamLeader: generateRandomName(),
                members: generateRandomMembers(4),
                schedule: {
                    startHour: '10',
                    startMinute: '00',
                    startPeriod: 'AM',
                    endHour: '7',
                    endMinute: '00',
                    endPeriod: 'PM'
                }
            }
        ]
    },
    {
        id: 4,
        name: 'Sales',
        totalTeams: 1,
        teams: [
            {
                id: 1,
                name: 'Lead Generation',
                teamLeader: generateRandomName(),
                members: generateRandomMembers(5),
                schedule: {
                    startHour: '8',
                    startMinute: '30',
                    startPeriod: 'AM',
                    endHour: '5',
                    endMinute: '30',
                    endPeriod: 'PM'
                }
            }
        ]
    },
    {
        id: 5,
        name: 'Finance',
        totalTeams: 1,
        teams: [
            {
                id: 1,
                name: 'Accounting',
                teamLeader: generateRandomName(),
                members: generateRandomMembers(3),
                schedule: {
                    startHour: '9',
                    startMinute: '00',
                    startPeriod: 'AM',
                    endHour: '5',
                    endMinute: '00',
                    endPeriod: 'PM'
                }
            }
        ]
    }
];

export default sampleDepartments;