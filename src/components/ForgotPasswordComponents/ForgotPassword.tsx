import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
});

export default function ForgotPassword() {
  const [disableSend, setDisable] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: { email: string }) {
    setDisable(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}api/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (response.ok) {
        toast.success("Password reset email sent");
      } else if (response.status === 404) {
        toast.error("User not found");
      } else if (response.status === 500) {
        toast.error("Error sending email");
      } else {
        toast.error("An unknown error occurred");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error sending email: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setDisable(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Insert your email address here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={disableSend} type="submit">
            Send Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
