import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeType } from './EmployeeTypes'; // Adjust the path if needed

const EmployeeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedEmployee,
  setSelectedEmployee,
  handleSaveEmployee
}: {
  isDialogOpen: boolean,
  setIsDialogOpen: (isOpen: boolean) => void,
  selectedEmployee: EmployeeType,
  setSelectedEmployee: (employee: EmployeeType) => void,
  handleSaveEmployee: (employee: EmployeeType) => void
}) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEmployee ? "Edit Employee" : "Create Employee"}</DialogTitle>
          <DialogDescription>
            {selectedEmployee ? "Update the employee details and click Save." : "Enter employee details to create a new employee."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Input
                  id="lastName"
                  value={selectedEmployee?.lastName || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Input
                  id="firstName"
                  value={selectedEmployee?.firstName || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="middleName">Middle Name</label>
                <Input
                  id="middleName"
                  value={selectedEmployee?.middleName || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, middleName: e.target.value })}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  value={selectedEmployee?.username || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, username: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={selectedEmployee?.password || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, password: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={selectedEmployee?.confirmPassword || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, confirmPassword: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <Input
                  id="role"
                  value={selectedEmployee?.role || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, role: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="department">Department</label>
                <Input
                  id="department"
                  value={selectedEmployee?.department || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                />
              </div>
            </>
          )}
        </div>
        <div className="mt-4 flex justify-between space-x-4">
          {step > 1 && (
            <Button onClick={prevStep} className="bg-gray-500 text-white hover:bg-gray-600">Previous</Button>
          )}
          {step < 2 ? (
            <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600 ml-auto">Next</Button>
          ) : (
            <Button onClick={() => handleSaveEmployee(selectedEmployee)} className="bg-green-500 text-white hover:bg-green-600 ml-auto">Save</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;
