"use client"

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// shad ui
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

// TanStack Query
import { useQueryClient } from '@tanstack/react-query';

// schema for the form
const formSchema = z.object({
  username: z.string().min(8, { message: "Username must be at least 8 characters." }).optional(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }).optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }).optional(),
  middleName: z.string().optional(),
  password: z.string().optional().refine((val) => (val ?? "") === "" || (val ?? "").length >= 8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().optional().refine((val) => (val ?? "") === "" || (val ?? "").length >= 8, {
    message: "Confirm password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword || data.password === "" || data.confirmPassword === "", {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function EmployeeEdit({ onSubmit, isOpen, onClose, employee }: { onSubmit: (values: any) => void, isOpen: boolean, onClose: () => void, employee: any }) {
  console.log('Employee ID:', employee.id);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName,
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const updatedFields: any = {};
    if (values.username) updatedFields.username = values.username;
    if (values.firstName) updatedFields.firstName = values.firstName;
    if (values.lastName) updatedFields.lastName = values.lastName;
    if (values.middleName) updatedFields.middleName = values.middleName;
    if (values.password) updatedFields.passwordCredentials = values.password;

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/employee/${employee.id}`, {
        ...updatedFields,
        isActive: true,
      });
      
      onSubmit(response.data);
      queryClient.invalidateQueries({ queryKey: ['employees'] }); // Invalidate the employee query
      handleClose();
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 400) {
        toast.error('Invalid employee ID.');
      } else {
        toast.error('Error updating the employee.');
      }
      console.error('Error updating the employee:', error);
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">Part 1: Identity Information</h2>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">Part 2: Account Credentials</h2>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update</Button>
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}