import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { User } from 'lucide-react';

function returnRole(role: string) {
	return role === 'ADMIN'
		? 'Admin'
		: role === 'TEAM_LEADER'
		? 'Team Leader'
		: 'Employee';
}

export default function UserInfoCard({ className }: { className: string }) {
	// useEffect(() => {
	// 	alertTimeup();
	// }, []);

	const userInfo = useUserStore.getState()?.user || {
		lastName: 'Doe',
		firstName: 'John',
		accessLevel: 'Employee',
		departmentName: 'DOJ',
		role: 'NOT WORKING',
	};
	const userFullName = userInfo!.lastName + ' ' + userInfo!.firstName;

	if (!userInfo) {
		return <p>An Error has Occured</p>;
	}

	return (
		<Card className={className}>
			<CardHeader className="flex flex-row p-3 pb-0 items-end justify-between w-full">
				<CardTitle className="text-lg">Employee Info</CardTitle>
				<User className=""></User>
			</CardHeader>
			<CardContent className="p-3 pt-0">
				<ul className="">
					<li>Name: {userFullName}</li>
					<li>Role: {userInfo!.role}</li>
					<li>Access Level: {returnRole(userInfo!.accessLevel)}</li>
					<li>Department: {userInfo!.departmentName}</li>
				</ul>

				{/* <button onClick={alertTimeup}>TEST</button> */}
			</CardContent>
		</Card>
	);
}
