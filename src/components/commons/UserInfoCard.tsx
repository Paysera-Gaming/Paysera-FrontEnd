import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';

export default function UserInfoCard() {
	const userInfo = useUserStore.getState().user;
	const userFullName = userInfo!.lastName + ' ' + userInfo!.firstName;

	// if (!userInfo) {
	// 	return <p>An Error has Occured</p>;
	// }

	return (
		<Card>
			<CardHeader>
				<CardTitle>Employee Info</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					<li>Name: {userFullName || 'John Doe'}</li>
					<li>Role: {userInfo!.role || 'Gamer'}</li>
					<li>Access Level: {userInfo!.accessLevel || 'Employee'}</li>
					<li>Department: {userInfo!.departmentName || 'DOJ'}</li>
				</ul>
			</CardContent>
		</Card>
	);
}
