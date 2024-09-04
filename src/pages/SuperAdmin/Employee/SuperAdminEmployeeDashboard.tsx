import EmployeeList from '@/components/SuperAdminComponents/EmployeeSuperAdmin/EmployeeList';

export default function SuperAdminEmployeeDashboard() {
    return (
        <div className="w-full h-full p-5">
            <h2 className="text-3xl font-semibold mb-5">Employee List</h2>
            <EmployeeList />
        </div>
    );
}
