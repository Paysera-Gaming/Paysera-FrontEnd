import { useNavigate } from 'react-router-dom';

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';

// shad ui
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// schema for the form
const formSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address.' })
        .min(1, { message: 'Email is required.' }),
    confirmationCode: z
        .string()
        .min(6, { message: 'Confirmation code must be at least 6 characters.' })
        .max(6, { message: 'Confirmation code must be 6 characters.' }),
    newPassword: z
        .string()
        .min(8, { message: 'New password must be at least 8 characters.' })
        .max(50, { message: 'Max character reached.' }),
    confirmNewPassword: z
        .string()
        .min(8, { message: 'Confirm new password must be at least 8 characters.' })
        .max(50, { message: 'Max character reached.' }),
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [disableSend, setDisable] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            confirmationCode: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    function onSubmit() {
        setDisable(true);
        // Dummy submit logic
        toast.success('Password reset successful');
        setDisable(false);
        navigate('/login');
    }

    return (
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
                            <FormDescription>Insert your email address here.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmationCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmation Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirmation Code" {...field} />
                            </FormControl>
                            <FormDescription>Insert the confirmation code sent to your email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="New Password" type="password" {...field} />
                            </FormControl>
                            <FormDescription>Insert your new password here.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm New Password" type="password" {...field} />
                            </FormControl>
                            <FormDescription>Confirm your new password here.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={disableSend} type="submit">
                    Reset Password
                </Button>
            </form>
        </Form>
    );
}