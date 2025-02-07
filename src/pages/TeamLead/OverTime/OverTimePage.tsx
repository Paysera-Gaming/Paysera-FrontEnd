import { getAttendanceToday } from '@/api/AttendanceAPI';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';

export default function OvertimePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['AttendanceToday'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return getAttendanceToday(departmentId.toString());
			} else {
				throw new Error('No Department Id Found');
			}
		},
		select: (data) => data.filter((user) => user.isRequestingOvertime),
	});

	console.log(data);

	return (
		<div className=" min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Overtime Approval
			</h2>
		</div>
	);
}
