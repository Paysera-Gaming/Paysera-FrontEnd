import { Outlet } from "react-router-dom";

import AuditorNavigation from "@/components/AuditorComponents/AuditorNavigationBar";
import Timebar from "@/components/TimeInComponent/TimeBar";

export default function AuditorPage() {
  return (
    <div className="h-full w-full flex flex-1 items-center justify-start p-5 gap-5">
      <AuditorNavigation></AuditorNavigation>
      {/* delete this h full and w full if something krazy happens */}
      <main className="flex w-full h-full items-center justify-start flex-col flex-1 gap-y-3">
        <Timebar></Timebar>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
