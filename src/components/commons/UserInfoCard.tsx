import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { User } from 'lucide-react';

import alertTimeup from './alertTimeup';
import { useEffect } from 'react';

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
		<Card className={className + ' p-2 pt-0 2xl:p-5'}>
			<CardHeader className="flex flex-row p-0 items-end justify-between w-full">
				<CardTitle className="text-base 2xl:text-lg">Employee Info</CardTitle>
				<User className=" 2xl:w-[1.25rem] 2xl:h-[1.25rem] h-[1.5rem] w-[1.5rem]"></User>
			</CardHeader>
			<CardContent className="p-0 pt-1">
				<ul className="text-sm 2xl:text-base">
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
