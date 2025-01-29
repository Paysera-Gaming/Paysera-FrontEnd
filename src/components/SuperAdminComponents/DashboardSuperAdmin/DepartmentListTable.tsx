//This is emegerncy code, it is not working, it is just for reference

// import { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import type { Department } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api";

// function DepartmentListTable({ tableData }: { tableData: Department[] }) {
//   const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

//   const renderedList = tableData.map((department) => (
//     <TableRow key={department.id} onClick={() => setSelectedDepartment(department)} className="cursor-pointer">
//       <TableCell>{department.name}</TableCell>
//       <TableCell>{department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}</TableCell>
//       <TableCell>{department.Employees ? department.Employees.length : 0}</TableCell>
//     </TableRow>
//   ));

//   return (
//     <>
//       <Table className="text-base">
//         <TableHeader>
//           <TableRow>
//             <TableHead>Department Name</TableHead>
//             <TableHead>Leader</TableHead>
//             <TableHead>Employee Count</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>{renderedList}</TableBody>
//       </Table>

//       {selectedDepartment && (
//         <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="text-2xl font-bold">{selectedDepartment.name}</DialogTitle>
//             </DialogHeader>
//             <DialogDescription>
//               Details of the selected department.
//             </DialogDescription>
//             <div className="space-y-2">
//               <div>
//                 <span className="font-semibold">Leader: </span>
//                 <span>{selectedDepartment.Leader ? `${selectedDepartment.Leader.firstName} ${selectedDepartment.Leader.lastName}` : 'No Leader Assigned'}</span>
//               </div>
//               <div>
//                 <span className="font-semibold">Employee Count: </span>
//                 <span>{selectedDepartment.Employees ? selectedDepartment.Employees.length : 0}</span>
//               </div>
//               <div>
//                 <span className="font-semibold">Employees: </span>
//                 <ul>
//                   {selectedDepartment.Employees?.map(employee => (
//                     <li key={employee.id}>{`${employee.firstName} ${employee.lastName} - ${employee.role}`}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button onClick={() => setSelectedDepartment(null)}>Close</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// }

// export default DepartmentListTable;