import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';

export default function UserInfoCard() {
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
		<Card className="row-span-2">
			<CardHeader>
				<CardTitle>Employee Info</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					<li>Name: {userFullName}</li>
					<li>Role: {userInfo!.role}</li>
					<li>Access Level: {userInfo!.accessLevel}</li>
					<li>Department: {userInfo!.departmentName}</li>
				</ul>
			</CardContent>
		</Card>
	);
}
