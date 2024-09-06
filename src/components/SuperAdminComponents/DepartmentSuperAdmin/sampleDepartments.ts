import type { Department } from './types';

// Sample team members
const sampleTeamMembers = {
    'Human Resources': [
        { firstName: 'Emily', middleName: 'Grace', lastName: 'Johnson', role: 'HR Manager' },
        { firstName: 'Benjamin', middleName: 'Thomas', lastName: 'Miller', role: 'HR Specialist' },
        { firstName: 'Sophia', middleName: 'Rose', lastName: 'Brown', role: 'HR Specialist' },
        { firstName: 'Lucas', middleName: 'Michael', lastName: 'Davis', role: 'HR Coordinator' },
        { firstName: 'Ava', middleName: 'Claire', lastName: 'Wilson', role: 'HR Assistant' }
    ],
    'Engineering': [
        { firstName: 'Olivia', middleName: 'Mae', lastName: 'Anderson', role: 'Engineering Manager' },
        { firstName: 'Ethan', middleName: 'Joshua', lastName: 'Taylor', role: 'Software Engineer' },
        { firstName: 'Isabella', middleName: 'Faith', lastName: 'Martinez', role: 'Software Engineer' },
        { firstName: 'Noah', middleName: 'Alexander', lastName: 'Harris', role: 'DevOps Engineer' },
        { firstName: 'Mia', middleName: 'Elise', lastName: 'Clark', role: 'Frontend Developer' }
    ],
    'Marketing': [
        { firstName: 'Charlotte', middleName: 'Anne', lastName: 'Roberts', role: 'Marketing Director' },
        { firstName: 'Samuel', middleName: 'Robert', lastName: 'Lewis', role: 'Marketing Coordinator' },
        { firstName: 'Lily', middleName: 'June', lastName: 'Walker', role: 'Content Strategist' },
        { firstName: 'Daniel', middleName: 'Joseph', lastName: 'Hall', role: 'SEO Specialist' },
        { firstName: 'Ava', middleName: 'Marie', lastName: 'Young', role: 'Social Media Manager' }
    ],
    'Sales': [
        { firstName: 'Nathaniel', middleName: 'James', lastName: 'Scott', role: 'Sales Manager' },
        { firstName: 'Zoe', middleName: 'Elizabeth', lastName: 'Green', role: 'Sales Representative' },
        { firstName: 'Henry', middleName: 'Oliver', lastName: 'Adams', role: 'Account Executive' },
        { firstName: 'Clara', middleName: 'Jane', lastName: 'Baker', role: 'Sales Representative' },
        { firstName: 'Gabriel', middleName: 'Luke', lastName: 'Nelson', role: 'Business Development Rep' }
    ],
    'Finance': [
        { firstName: 'Ella', middleName: 'Katherine', lastName: 'Mitchell', role: 'Finance Manager' },
        { firstName: 'Jack', middleName: 'Harrison', lastName: 'Carter', role: 'Financial Analyst' },
        { firstName: 'Grace', middleName: 'Amelia', lastName: 'Phillips', role: 'Accountant' },
        { firstName: 'Liam', middleName: 'Matthew', lastName: 'Evans', role: 'Bookkeeper' },
        { firstName: 'Harper', middleName: 'Sophia', lastName: 'Collins', role: 'Financial Analyst' }
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