import type { Department } from './DepartmentList';

// Sample team members
const sampleTeamMembers = {
    'Human Resources': [
        { firstName: 'Emily', middleName: 'Grace', lastName: 'Johnson' },
        { firstName: 'Benjamin', middleName: 'Thomas', lastName: 'Miller' },
        { firstName: 'Sophia', middleName: 'Rose', lastName: 'Brown' },
        { firstName: 'Lucas', middleName: 'Michael', lastName: 'Davis' },
        { firstName: 'Ava', middleName: 'Claire', lastName: 'Wilson' }
    ],
    'Engineering': [
        { firstName: 'Olivia', middleName: 'Mae', lastName: 'Anderson' },
        { firstName: 'Ethan', middleName: 'Joshua', lastName: 'Taylor' },
        { firstName: 'Isabella', middleName: 'Faith', lastName: 'Martinez' },
        { firstName: 'Noah', middleName: 'Alexander', lastName: 'Harris' },
        { firstName: 'Mia', middleName: 'Elise', lastName: 'Clark' }
    ],
    'Marketing': [
        { firstName: 'Charlotte', middleName: 'Anne', lastName: 'Roberts' },
        { firstName: 'Samuel', middleName: 'Robert', lastName: 'Lewis' },
        { firstName: 'Lily', middleName: 'June', lastName: 'Walker' },
        { firstName: 'Daniel', middleName: 'Joseph', lastName: 'Hall' },
        { firstName: 'Ava', middleName: 'Marie', lastName: 'Young' }
    ],
    'Sales': [
        { firstName: 'Nathaniel', middleName: 'James', lastName: 'Scott' },
        { firstName: 'Zoe', middleName: 'Elizabeth', lastName: 'Green' },
        { firstName: 'Henry', middleName: 'Oliver', lastName: 'Adams' },
        { firstName: 'Clara', middleName: 'Jane', lastName: 'Baker' },
        { firstName: 'Gabriel', middleName: 'Luke', lastName: 'Nelson' }
    ],
    'Finance': [
        { firstName: 'Ella', middleName: 'Katherine', lastName: 'Mitchell' },
        { firstName: 'Jack', middleName: 'Harrison', lastName: 'Carter' },
        { firstName: 'Grace', middleName: 'Amelia', lastName: 'Phillips' },
        { firstName: 'Liam', middleName: 'Matthew', lastName: 'Evans' },
        { firstName: 'Harper', middleName: 'Sophia', lastName: 'Collins' }
    ]
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
                teamLeader: sampleTeamMembers['Human Resources'][0],
                members: sampleTeamMembers['Human Resources'],
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
                teamLeader: sampleTeamMembers['Engineering'][0],
                members: sampleTeamMembers['Engineering'],
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
                teamLeader: sampleTeamMembers['Marketing'][0],
                members: sampleTeamMembers['Marketing'],
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
                teamLeader: sampleTeamMembers['Sales'][0],
                members: sampleTeamMembers['Sales'],
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
                teamLeader: sampleTeamMembers['Finance'][0],
                members: sampleTeamMembers['Finance'],
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