import DepartmentList from '@/components/SuperAdminComponents/DepartmentSuperAdmin/DepartmentList';

export default function SuperAdminEmployeeDashboard() {
    return (
        <div className="w-full h-full p-5">
            <h2 className="text-3xl font-semibold mb-5">Department List</h2>
            <DepartmentList />
        </div>
    );
}
