import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

type TeamsTableProps = {
  paginatedData: YourDataType; // Replace 'YourDataType' with the actual type of 'paginatedData'
  handleEditTeam: (team: YourTeamType) => void; // Replace 'YourTeamType' with the actual type of 'team'
  handleDeleteTeams: (id: number) => void; // Replace 'number' with the actual type of 'id'
  handleSort: (sortKey: string) => void; // Replace 'string' with the actual type of 'sortKey'
};

const TeamsTable = ({ paginatedData, handleEditTeam, handleDeleteTeams, handleSort }: TeamsTableProps) => (
  <Table className="w-full border-collapse">
    {/* <TableCaption>Details of teams and their statuses.</TableCaption> */}
    <TableHeader>
      <TableRow>
        <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('name')}>Team Leader Name</TableHead>
        <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('Department')}>Department</TableHead>
        <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('teamLeaderEmail')}>Team Leader Email</TableHead>
        <TableHead className="text-center border-x">Team Members</TableHead>
        <TableHead className="text-center border-x">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {paginatedData.length > 0 ? (
        paginatedData.map((team: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; Department: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; teamLeaderEmail: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; members: any[]; }) => (
          <TableRow key={team.id}>
            <TableCell className="text-center border-x">{team.name}</TableCell>
            <TableCell className="text-center border-x">{team.Department}</TableCell>
            <TableCell className="text-center border-x">{team.teamLeaderEmail}</TableCell>
            <TableCell className="text-center border-x">
              {team.members.slice(0, 3).join(', ')}
              {team.members.length > 3 && (
                <span className="text-gray-500">, and {team.members.length - 3} more...</span>
              )}
            </TableCell>
            <TableCell className="text-center border-x">
              <div className="space-x-2">
                <Button onClick={() => handleEditTeam(team)} className="bg-blue-500 text-white hover:bg-blue-700">Edit</Button>
                <Button onClick={() => handleDeleteTeams(team.id as number)} className="bg-red-500 text-white hover:bg-red-700">Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="text-center border-x" colSpan={5}>No teams found.</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default TeamsTable;
