import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, BookUser, CalendarClockIcon } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import ScheduleInfoCard from '@/components/ScheduleInfo/ScheduleInfoCard';

function returnRole(role: string) {
	return role === 'ADMIN'
		? 'Admin'
		: role === 'TEAM_LEADER'
		? 'Team Leader'
		: 'Employee';
}

// create a map of the user's information
function UserInfo() {
	const info = useUserStore.getState().user;

	if (!info) {
		return <p>error</p>;
	}

	return (
		<ul>
			<li>
				<b>Name:&nbsp;</b>
				{info.firstName} {info.middleName} {info.lastName}
			</li>
			<li>
				<b>Role:&nbsp;</b>
				{info.role}
			</li>
			<li>
				<b>Access Level:&nbsp;</b>
				{returnRole(info.accessLevel)}
			</li>
			<li>
				<b>Department :&nbsp;</b>
				{info.departmentName}
			</li>
		</ul>
	);
}

export default function EmployeeInfoCard() {
	return (
		<div className="flex flex-col gap-2">
			<Tabs defaultValue="user">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="employee"
						className="flex items-center justify-between flex-row text-base"
					>
						Employee Info <BookUser size={'1.8rem'}></BookUser>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center justify-between flex-row"
						value="schedule"
					>
						Schedule Info
						<CalendarClockIcon size={'1.8rem'}></CalendarClockIcon>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="employee">
					<Card className="flex-1 p-0">
						<CardHeader className=" pb-1 flex flex-row items-center justify-between">
							<CardTitle>Employee Info</CardTitle>
						</CardHeader>
						<CardContent>
							<UserInfo></UserInfo>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="schedule">
					<ScheduleInfoCard></ScheduleInfoCard>
				</TabsContent>
			</Tabs>

			{/* pdf thing  */}
			<Card className="select-none border-primary hover:cursor-pointer text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out ">
				<CardHeader className=" pb-0 flex flex-row items-center justify-between">
					<CardTitle className="">Employee Handbook</CardTitle>
					<Book></Book>
				</CardHeader>
				<CardContent className="">
					<CardDescription className="text-primary">
						Click here to download
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	);
}
