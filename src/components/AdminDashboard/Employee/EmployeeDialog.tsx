import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Please update the employee details and click Save to apply changes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
            <label htmlFor="team">Team</label>
            <Input
              id="team"
              value={selectedEmployee?.team || ''}  
              onChange={(e) => setSelectedEmployee({ ...selectedEmployee, team: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Select
              value={selectedEmployee?.type || 'Fixed'}
              onValueChange={(value) => setSelectedEmployee({ ...selectedEmployee, type: value })}
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
          <Button onClick={() => handleSaveEmployee(selectedEmployee)} className="bg-green-500 text-white hover:bg-green-600">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;
