import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { User } from 'lucide-react';

import alertTimeup from './alertTimeup';

function returnRole(role: string) {
	return role === 'ADMIN'
		? 'Admin'
		: role === 'TEAM_LEADER'
		? 'Team Leader'
		: 'Employee';
}

export default function UserInfoCard({ className }: { className: string }) {
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
			<CardHeader className="flex-row p-3 2xl:p-5 items-center justify-between w-full">
				<CardTitle className="text-base 2xl:text-lg   ">
					Employee Info
				</CardTitle>
				<User></User>
			</CardHeader>
			<CardContent className=" p-3 pt-0 2xl:p-5">
				<ul>
					<li>Name: {userFullName}</li>
					<li>Role: {returnRole(userInfo!.role)}</li>
					<li>Access Level: {userInfo!.accessLevel}</li>
					<li>Department: {userInfo!.departmentName}</li>
				</ul>

				{/* <button onClick={alertTimeup}>TEST</button> */}
			</CardContent>
		</Card>
	);
}
