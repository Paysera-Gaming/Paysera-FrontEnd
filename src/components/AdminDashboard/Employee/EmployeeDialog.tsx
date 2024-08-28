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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEmployee?.id === 0 ? 'Create Employee' : 'Edit Employee'}</DialogTitle>
          <DialogDescription>
            {selectedEmployee?.id === 0 ? 'Please enter the employee details and click Save to create a new employee.' : 'Please update the employee details and click Save to apply changes.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Input
              id="lastName"
              value={selectedEmployee?.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Input
              id="firstName"
              value={selectedEmployee?.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="team">Team</label>
            <Input
              id="team"
              value={selectedEmployee?.team || ''}
              onChange={(e) => handleInputChange('team', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Select
              value={selectedEmployee?.type || 'Fixed'}
              onValueChange={(value) => {
                if (selectedEmployee) {
                  setSelectedEmployee({ ...selectedEmployee, type: value as "Fixed" | "Flexible" | "Super Flexible" });
                }
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
                <SelectItem value="Super Flexible">Super Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
          <Button
            onClick={() => {
              if (selectedEmployee) {
                handleSaveEmployee(selectedEmployee);
              }
            }}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;