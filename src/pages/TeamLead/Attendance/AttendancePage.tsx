import { DatePicker } from '@/components/TeamLeadComponents/AttendancePage/DatePicker';
import { Button } from '@/components/ui/button';

export default function AttendancePage() {
	return (
		<div className="w-full flex-1 inline-block border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Attendance
			</h2>

			<div>
				<DatePicker></DatePicker>
				<Button className="ml-2">Search</Button>
			</div>

			{/* table */}
		</div>
	);
}
