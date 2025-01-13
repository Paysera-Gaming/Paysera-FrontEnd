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
	const userInfo = useUserStore.getState()?.user || {
		lastName: 'Doe',
		firstName: 'John',
		accessLevel: 'Employee',
		departmentName: 'DOJ',
		role: 'gamer',
	};
	const userFullName = userInfo!.lastName + ' ' + userInfo!.firstName;

	if (!userInfo) {
		return <p>An Error has Occured</p>;
	}

	return (
		<Card className={className}>
			<CardHeader className="flex-row items-center justify-between w-full">
				<CardTitle>Employee Info</CardTitle>
				<User></User>
			</CardHeader>
			<CardContent>
				<ul>
					<li>Name: {userFullName}</li>
					<li>Role: {returnRole(userInfo!.role)}</li>
					<li>Access Level: {userInfo!.accessLevel}</li>
					<li>Department: {userInfo!.departmentName}</li>
				</ul>
			</CardContent>
		</Card>
	);
}
