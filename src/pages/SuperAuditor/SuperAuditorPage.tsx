import { Outlet } from "react-router-dom";

import SuperAuditorNavigation from "@/components/SuperAuditorComponents/SuperAuditorNavigationBar";

export default function SuperAuditorPage() {
  return (
    <div className="h-full w-full flex flex-1 items-center justify-start p-5 gap-5">
      <SuperAuditorNavigation></SuperAuditorNavigation>
      {/* delete this h full and w full if something krazy happens */}
      <main className="flex w-full h-full items-center justify-start flex-col flex-1 gap-y-3">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
