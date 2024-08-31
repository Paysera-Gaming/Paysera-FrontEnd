import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Users, UserCheck, UserX } from 'lucide-react';

const sampleEmployees = [
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'M', isActive: true, department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', middleName: 'A', isActive: false, department: 'Finance', role: 'Analyst' },
    { id: 3, firstName: 'Emily', lastName: 'Johnson', middleName: 'R', isActive: true, department: 'IT', role: 'Developer' },
];

export default function EmployeeList() {
    const [employees, setEmployees] = useState(sampleEmployees);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onlineCount = employees.filter(emp => emp.isActive).length;
    const offlineCount = employees.length - onlineCount;

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                />
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>Create</Button>
                </div>
            </div>
            <div className="flex gap-4 mb-4">
                <Card className="flex-1 p-2">
                    <CardHeader className="flex items-center justify-between">
                        <Users size={20} />
                        <div className="flex items-center gap-2">
                            <CardTitle>Overall Total</CardTitle>
                            <p className="text-xl font-semibold">{employees.length}</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex-1 p-2">
                    <CardHeader className="flex items-center justify-between">
                        <UserCheck size={20} />
                        <div className="flex items-center gap-2">
                            <CardTitle>Online</CardTitle>
                            <p className="text-xl font-semibold">{onlineCount}</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex-1 p-2">
                    <CardHeader className="flex items-center justify-between">
                        <UserX size={20} />
                        <div className="flex items-center gap-2">
                            <CardTitle>Offline</CardTitle>
                            <p className="text-xl font-semibold">{offlineCount}</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Employee List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>{`${emp.lastName}, ${emp.firstName} ${emp.middleName}`}</TableCell>
                                    <TableCell>{emp.isActive ? 'Online' : 'Offline'}</TableCell>
                                    <TableCell>{emp.department}</TableCell>
                                    <TableCell>{emp.role}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" leftIcon={<Edit2 size={16} />}>Edit</Button>
                                            <Button variant="outline" size="sm" color="red" leftIcon={<Trash2 size={16} />}>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}