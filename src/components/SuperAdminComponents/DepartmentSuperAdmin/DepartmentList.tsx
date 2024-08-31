import { useState } from 'react';
import DepartmentTable from './DepartmentTable';

const sampleDepartments = [
    {
        departmentName: 'HR',
        teams: [
            {
                teamName: 'Recruitment',
                leader: { firstName: 'Alice', lastName: 'Brown', middleName: 'S' },
                members: [
                    { firstName: 'John', lastName: 'Doe', middleName: 'M' },
                    { firstName: 'Jane', lastName: 'Smith', middleName: 'A' },
                    { firstName: 'Emily', lastName: 'Johnson', middleName: 'R' },
                    { firstName: 'Michael', lastName: 'Williams', middleName: 'T' },
                ],
            },
        ],
    },
    {
        departmentName: 'IT',
        teams: [
            {
                teamName: 'Development',
                leader: { firstName: 'David', lastName: 'Clark', middleName: 'P' },
                members: [
                    { firstName: 'James', lastName: 'Wilson', middleName: 'K' },
                    { firstName: 'Patricia', lastName: 'Martinez', middleName: 'L' },
                    { firstName: 'Linda', lastName: 'Garcia', middleName: 'Q' },
                ],
            },
            {
                teamName: 'Operations',
                leader: { firstName: 'Robert', lastName: 'Jones', middleName: 'N' },
                members: [
                    { firstName: 'Mary', lastName: 'Miller', middleName: 'O' },
                    { firstName: 'Barbara', lastName: 'Davis', middleName: 'R' },
                    { firstName: 'Elizabeth', lastName: 'Rodriguez', middleName: 'S' },
                    { firstName: 'Michael', lastName: 'Williams', middleName: 'T' },
                ],
            },
        ],
    },
];

export default function DepartmentList() {
    const [departments] = useState(sampleDepartments);

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((acc, dept) => acc + dept.teams.length, 0);

    return (
        <div>
            <div className="mb-4">
                <p className="text-lg">Total Departments: {totalDepartments}</p>
                <p className="text-lg">Total Teams: {totalTeams}</p>
            </div>
            <DepartmentTable departments={departments} />
        </div>
    );
}
