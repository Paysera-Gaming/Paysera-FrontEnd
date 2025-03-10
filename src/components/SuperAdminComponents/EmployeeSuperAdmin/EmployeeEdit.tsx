import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox component
import { User, Lock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api";
import axios from "axios"; // Import axios
import { Employee } from "./types";

const formSchema = z
  .object({
    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters." })
      .optional(),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." })
      .optional(),
    middleName: z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }).optional(), // Added email field
    password: z
      .string()
      .optional()
      .refine((val) => (val ?? "") === "" || (val ?? "").length >= 8, {
        message: "Password must be at least 8 characters.",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => (val ?? "") === "" || (val ?? "").length >= 8, {
        message: "Confirm password must be at least 8 characters.",
      }),
    accessLevel: z
      .enum(["TEAM_LEADER", "EMPLOYEE", "ADMIN", "AUDITOR", "SUPER_AUDITOR"], {
        required_error: "Access level is required.",
      })
      .optional(),
    isAllowedRequestOvertime: z.boolean().optional(), // Add this line
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword ||
      data.password === "" ||
      data.confirmPassword === "",
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

interface EmployeeEditProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export default function EmployeeEdit({
  onSubmit,
  isOpen,
  onClose,
  employee,
}: EmployeeEditProps) {
  console.log("Employee ID:", employee.id);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName || "N/A",
      email: employee.email || "", // Default value for email
      password: "",
      confirmPassword: "",
      accessLevel: employee.accessLevel || "EMPLOYEE",
      isAllowedRequestOvertime: employee.isAllowedRequestOvertime, // Add this line
    },
  });

  const accessLevel = useWatch({
    control: form.control,
    name: "accessLevel",
  });

  useEffect(() => {
    form.reset({
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName || "N/A",
      email: employee.email || "", // Reset email to default
      password: "",
      confirmPassword: "",
      accessLevel: employee.accessLevel || "EMPLOYEE",
      isAllowedRequestOvertime: employee.isAllowedRequestOvertime, // Add this line
    });
  }, [employee, form]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const updatedFields: Partial<Employee> = {};
    if (values.username) updatedFields.username = values.username;
    if (values.firstName) updatedFields.firstName = values.firstName;
    if (values.lastName) updatedFields.lastName = values.lastName;
    updatedFields.middleName = values.middleName || "N/A";
    if (values.email) updatedFields.email = values.email; // Add email to updated fields
    if (values.accessLevel) updatedFields.accessLevel = values.accessLevel;
    if (values.isAllowedRequestOvertime !== undefined)
      updatedFields.isAllowedRequestOvertime = values.isAllowedRequestOvertime; // Add this line

    try {
      const response = await axiosInstance.put(`/api/employee/${employee.id}`, {
        ...updatedFields,
        password: values.password, // Handle password separately
        isActive: employee.isActive,
      });

      if (response.status === 200) {
        toast.success(
          `Successfully edited ${employee.firstName} ${employee.lastName}`
        );
        onSubmit(response.data);
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        handleClose();
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        toast.error("Invalid employee ID.");
      } else {
        toast.error("Failed to update the employee. Please try again.");
      }
      console.error("Error editing the employee:", error);
      form.reset(form.getValues());
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="identity">
                  <User className="mr-2 h-4 w-4" />
                  Identity Information
                </TabsTrigger>
                <TabsTrigger value="credentials">
                  <Lock className="mr-2 h-4 w-4" />
                  Account Credentials & Access Level
                </TabsTrigger>
              </TabsList>
              <TabsContent value="identity">
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Information</CardTitle>
                    <CardDescription>
                      Fill out the identity information for the employee.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="credentials">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Credentials & Access Level</CardTitle>
                    <CardDescription>
                      Set the account credentials and access level for the
                      employee.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accessLevel"
                        render={() => (
                          <FormItem>
                            <FormLabel>Access Level</FormLabel>
                            <FormControl>
                              <Controller
                                control={form.control}
                                name="accessLevel"
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Access Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="EMPLOYEE">
                                        Employee
                                      </SelectItem>
                                      <SelectItem value="TEAM_LEADER">
                                        Team Leader
                                      </SelectItem>
                                      <SelectItem value="ADMIN">
                                        Admin
                                      </SelectItem>
                                      <SelectItem value="AUDITOR">
                                        Auditor
                                      </SelectItem>
                                      <SelectItem value="SUPER_AUDITOR">
                                        Super Auditor
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    {accessLevel !== "ADMIN" &&
                      accessLevel !== "AUDITOR" &&
                      accessLevel !== "SUPER_AUDITOR" && (
                        <FormField
                          control={form.control}
                          name="isAllowedRequestOvertime"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="ml-2">
                                Allow Overtime Requests
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" className="dark:text-white">
                Update
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}
