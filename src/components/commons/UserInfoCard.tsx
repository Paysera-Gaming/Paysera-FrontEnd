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
			<CardHeader className="flex flex-row  p-3 pb-0  2xl:p-6  items-center justify-between w-full">
				<CardTitle className="text-lg mt-1 2xl:text-2xl ">
					Employee Info
				</CardTitle>
				<User></User>
			</CardHeader>
			<CardContent className="p-3  2xl:p-6 2xl:pt-0 pt-0">
				<ul className="2xl:text-lg">
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
