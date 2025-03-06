import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "@/components/LoginPageComponents/LoginForm";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

const routeMaps = new Map([
  ["EMPLOYEE", "/employee/dashboard"],
  ["TEAM_LEADER", "/teamlead/dashboard"],
  ["ADMIN", "/superadmin/dashboard"],
  ["SUPER_AUDITOR", "/superauditor/dashboard"],
]);

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useUserStore.getState().user;

  useEffect(() => {
    // check first if there is already permission to send notifs
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    if (user) {
      const userRoute = user.accessLevel;
      console.log("User is logged in");
      const route = routeMaps.get(userRoute || "") || "/defaultRoute";
      navigate(route);
    }
  }, [user, navigate]); // Add user and navigate as dependencies

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <main className=" h-full flex items-center justify-center">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Paysera</CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Paysera&reg; 2024</p>
        </CardFooter>
      </Card>
    </main>
  );
}