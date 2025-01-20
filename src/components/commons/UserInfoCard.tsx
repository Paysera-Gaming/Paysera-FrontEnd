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
			<CardHeader className="flex-row pb-3   items-center justify-between w-full">
				<CardTitle className="text-base lg:text-lg xl:text-2xl  ">
					Employee Info
				</CardTitle>
				<User></User>
			</CardHeader>
			<CardContent>
				<ul>
					<li>Name: {userFullName}</li>
					<li>Role: {returnRole(userInfo!.role)}</li>
					<li>Access Level: {userInfo!.accessLevel}</li>
					<li>Department: {userInfo!.departmentName}</li>
				</ul>

				<button onClick={alertTimeup}>TEST</button>
			</CardContent>
		</Card>
	);
}
