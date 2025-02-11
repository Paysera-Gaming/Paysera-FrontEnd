import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import ForgotPassword from '@/components/ForgotPasswordComponents/ForgotPassword';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <main className="h-full flex items-center justify-center">
            <Card className="w-[360px]">
                <CardHeader>
                    <CardTitle>Paysera</CardTitle>
                    <CardDescription>Forgot Password</CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPassword />
                    <button
                        className="mt-4 text-blue-500 hover:underline"
                        onClick={handleBackToLogin}
                    >
                        Back to Login
                    </button>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">Paysera&reg; 2024</p>
                </CardFooter>
            </Card>
        </main>
    );
}