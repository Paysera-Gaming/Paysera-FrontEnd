import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ResetPassword from "@/components/ResetPasswordComponents/ResetPassword";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <main className="h-full flex items-center justify-center">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Paysera</CardTitle>
          <CardDescription>Reset Password</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPassword />
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
