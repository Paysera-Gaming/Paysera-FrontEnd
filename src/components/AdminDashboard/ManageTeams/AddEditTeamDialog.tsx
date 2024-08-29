import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidName, isValidEmail } from './validation';

type AddEditTeamDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTeam: Team;
  setSelectedTeam: React.Dispatch<React.SetStateAction<Team>>;
  handleSaveTeam: () => void;
};

const AddEditTeamDialog = ({ isDialogOpen, setIsDialogOpen, selectedTeam, setSelectedTeam, handleSaveTeam }: AddEditTeamDialogProps) => {
  const [newMember, setNewMember] = useState("");
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleAddMember = () => {
    if (newMember) {
      setSelectedTeam({ ...selectedTeam, members: [...selectedTeam.members, newMember] });
      setNewMember("");
    }
  };

  const handleDeleteMember = (member: any) => {
    setSelectedTeam({ ...selectedTeam, members: selectedTeam.members.filter((m: any) => m !== member) });
  };

  const saveTeam = () => {
    let nameError = '';
    let emailError = '';

    if (!isValidName(selectedTeam.name)) {
      nameError = 'Please enter the name in the format: Last Name, First Name Middle Name';
    }
    if (!isValidEmail(selectedTeam.teamLeaderEmail)) {
      emailError = 'Please enter a valid email address';
    }

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
    } else {
      setErrors({ name: '', email: '' });
      handleSaveTeam();
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedTeam.id ? "Edit Team" : "Add New Team"}</DialogTitle>
          <DialogDescription>Fill out the form below to {selectedTeam.id ? "edit the" : "add a new"} team.</DialogDescription>
        </DialogHeader>
        {/* Team Name */}
        <div className="mb-4">
          <label className="block font-semibold">Team Leader Name:</label>
          <Input
            type="text"
            value={selectedTeam.name}
            onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
            className="border rounded p-2 w-full"
            placeholder="Last Name, First Name Middle Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        {/* Department */}
        <div className="mb-4">
          <label className="block font-semibold">Department:</label>
          <Input
            type="text"
            value={selectedTeam.Department}
            onChange={(e) => setSelectedTeam({ ...selectedTeam, Department: e.target.value })}
            className="border rounded p-2 w-full"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold">Team Leader Email:</label>
          <Input
            type="email"
            value={selectedTeam.teamLeaderEmail}
            onChange={(e) => setSelectedTeam({ ...selectedTeam, teamLeaderEmail: e.target.value })}
            className="border rounded p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {/* Members */}
        <div className="mb-4">
          <label className="block font-semibold">Team Members:</label>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Add a new member"
            />
            <Button onClick={handleAddMember} className="bg-green-500 text-white hover:bg-green-600">Add</Button>
          </div>
          <div className="flex flex-wrap">
            {selectedTeam.members.map((member: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
              <div key={index} className="bg-gray-200 rounded-full px-4 py-2 mb-2 mr-2 flex items-center space-x-2">
                <span>{member}</span>
                <button onClick={() => handleDeleteMember(member)} className="text-red-500 hover:text-red-700">×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
          <Button onClick={saveTeam} className="bg-green-500 text-white hover:bg-green-600">Save Team</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTeamDialog;
