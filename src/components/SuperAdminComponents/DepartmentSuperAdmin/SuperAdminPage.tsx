import { Outlet } from 'react-router-dom';
import SuperAdminNavigation from '@/components/SuperAdminComponents/SuperAdminNavigationBar';
import Timebar from '@/components/TimeInComponent/TimeBar';
import { Toaster } from '@/components/ui/sonner';

export default function SuperAdminPage() {
    return (
        <div className="h-full w-full flex flex-1 items-center justify-start p-5 gap-5">
            <SuperAdminNavigation />
            <main className="flex w-full h-full items-center justify-start flex-col flex-1 gap-y-3">
                <Timebar />
                <Outlet />
            </main>
            <Toaster richColors closeButton />
        </div>
    );
}
