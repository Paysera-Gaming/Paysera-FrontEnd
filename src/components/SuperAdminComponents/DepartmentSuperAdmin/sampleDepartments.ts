import type { Department } from './DepartmentList';

// Sample team members
const sampleTeamMembers = {
    'Human Resources': [
        { firstName: 'Emily', middleName: 'Grace', lastName: 'Johnson', role: 'Team Leader' },
        { firstName: 'Benjamin', middleName: 'Thomas', lastName: 'Miller', role: 'Team Member' },
        { firstName: 'Sophia', middleName: 'Rose', lastName: 'Brown', role: 'Team Member' },
        { firstName: 'Lucas', middleName: 'Michael', lastName: 'Davis', role: 'Team Member' },
        { firstName: 'Ava', middleName: 'Claire', lastName: 'Wilson', role: 'Team Member' }
    ],
    'Engineering': [
        { firstName: 'Olivia', middleName: 'Mae', lastName: 'Anderson', role: 'Team Leader' },
        { firstName: 'Ethan', middleName: 'Joshua', lastName: 'Taylor', role: 'Team Member' },
        { firstName: 'Isabella', middleName: 'Faith', lastName: 'Martinez', role: 'Team Member' },
        { firstName: 'Noah', middleName: 'Alexander', lastName: 'Harris', role: 'Team Member' },
        { firstName: 'Mia', middleName: 'Elise', lastName: 'Clark', role: 'Team Member' }
    ],
    'Marketing': [
        { firstName: 'Charlotte', middleName: 'Anne', lastName: 'Roberts', role: 'Team Leader' },
        { firstName: 'Samuel', middleName: 'Robert', lastName: 'Lewis', role: 'Team Member' },
        { firstName: 'Lily', middleName: 'June', lastName: 'Walker', role: 'Team Member' },
        { firstName: 'Daniel', middleName: 'Joseph', lastName: 'Hall', role: 'Team Member' },
        { firstName: 'Ava', middleName: 'Marie', lastName: 'Young', role: 'Team Member' }
    ],
    'Sales': [
        { firstName: 'Nathaniel', middleName: 'James', lastName: 'Scott', role: 'Team Leader' },
        { firstName: 'Zoe', middleName: 'Elizabeth', lastName: 'Green', role: 'Team Member' },
        { firstName: 'Henry', middleName: 'Oliver', lastName: 'Adams', role: 'Team Member' },
        { firstName: 'Clara', middleName: 'Jane', lastName: 'Baker', role: 'Team Member' },
        { firstName: 'Gabriel', middleName: 'Luke', lastName: 'Nelson', role: 'Team Member' }
    ],
    'Finance': [
        { firstName: 'Ella', middleName: 'Katherine', lastName: 'Mitchell', role: 'Team Leader' },
        { firstName: 'Jack', middleName: 'Harrison', lastName: 'Carter', role: 'Team Member' },
        { firstName: 'Grace', middleName: 'Amelia', lastName: 'Phillips', role: 'Team Member' },
        { firstName: 'Liam', middleName: 'Matthew', lastName: 'Evans', role: 'Team Member' },
        { firstName: 'Harper', middleName: 'Sophia', lastName: 'Collins', role: 'Team Member' }
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
                teamLeader: sampleTeamMembers['Human Resources'][0],
                members: sampleTeamMembers['Human Resources']
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
                teamLeader: sampleTeamMembers['Engineering'][0],
                members: sampleTeamMembers['Engineering']
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
                teamLeader: sampleTeamMembers['Marketing'][0],
                members: sampleTeamMembers['Marketing']
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
                teamLeader: sampleTeamMembers['Sales'][0],
                members: sampleTeamMembers['Sales']
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
                teamLeader: sampleTeamMembers['Finance'][0],
                members: sampleTeamMembers['Finance']
            }
        ]
    }
];

export default sampleDepartments;