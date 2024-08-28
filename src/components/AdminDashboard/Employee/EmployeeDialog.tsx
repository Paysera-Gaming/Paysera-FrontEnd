import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Define the Employee type
type Employee = {
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  status: string;
  team: string;
  role?: string;
  email?: string;
  type: 'Fixed' | 'Flexible' | 'Super Flexible';
  username?: string;
  password?: string;
  confirmPassword?: string;
};

type EmployeeDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmployee: Employee | null; // Allow for null
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>; // Allow for null
  handleSaveEmployee: (employee: Employee) => void;
};

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ isDialogOpen, setIsDialogOpen, selectedEmployee, setSelectedEmployee, handleSaveEmployee }) => {
  // Check if selectedEmployee is null
  const handleInputChange = (field: keyof Employee, value: string) => {
    if (selectedEmployee) {
      setSelectedEmployee({ ...selectedEmployee, [field]: value });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">{selectedEmployee?.id === 0 ? 'Create Employee' : 'Edit Employee'}</DialogTitle>
          <DialogDescription className="text-lg">
            {selectedEmployee?.id === 0 ? 'Please enter the employee details and click Save to create a new employee.' : 'Please update the employee details and click Save to apply changes.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-6">
          {/* Part 1: Identity Information */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Identity Information</h3>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1">Last Name</label>
              <Input
                id="lastName"
                value={selectedEmployee?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1">First Name</label>
              <Input
                id="firstName"
                value={selectedEmployee?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="middleName" className="block mb-1">Middle Name</label>
              <Input
                id="middleName"
                value={selectedEmployee?.middleName || ''}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                className="w-full p-2"
              />
            </div>
          </div>

          {/* Part 2: Account Credentials */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Account Credentials</h3>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">Username</label>
              <Input
                id="username"
                value={selectedEmployee?.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <Input
                id="password"
                type="password"
                value={selectedEmployee?.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <Input
                id="confirmPassword"
                type="password"
                value={selectedEmployee?.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full p-2"
              />
            </div>
          </div>

          {/* Part 3: Job Duties */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Job Duties</h3>
            <div className="mb-4">
              <label htmlFor="team" className="block mb-1">Team</label>
              <Input
                id="team"
                value={selectedEmployee?.team || ''}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block mb-1">Role</label>
              <Input
                id="role"
                value={selectedEmployee?.role || ''}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block mb-1">Type</label>
              <Select
                value={selectedEmployee?.type || 'Fixed'}
                onValueChange={(value) => {
                  if (selectedEmployee) {
                    setSelectedEmployee({ ...selectedEmployee, type: value as "Fixed" | "Flexible" | "Super Flexible" });
                  }
                }}
              >
                <SelectTrigger className="w-full p-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                  <SelectItem value="Super Flexible">Super Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2">Cancel</Button>
          <Button
            onClick={() => {
              if (selectedEmployee) {
                handleSaveEmployee(selectedEmployee);
              }
            }}
            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;