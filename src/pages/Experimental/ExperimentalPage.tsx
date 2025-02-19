import ClockExperimental from '@/components/Experimental/ClockExperimental';
import CollapsableNavigation from '@/components/Experimental/CollapsableNavigation';
import DepartmentOverview from '@/components/Experimental/DepartmentOverview';

export default function ExperimentalPage() {
	return (
		<main className="h-[100svh] w-[100svw] min-h-0 min-w-0 flex bg-red-500 items-center justify-start p-5 gap-10 relative">
			{/* new nav*/}
			<CollapsableNavigation></CollapsableNavigation>
			<DepartmentOverview></DepartmentOverview>
			<ClockExperimental></ClockExperimental>
		</main>
	);
}
