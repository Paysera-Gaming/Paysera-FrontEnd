import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Book, BookUser } from 'lucide-react';

export default function EmployeeInfoCard() {
	return (
		<div className="flex flex-col gap-2">
			<Card className="flex-1 p-0">
				<CardHeader className="pb-2 flex items-center justify-between flex-row">
					<CardTitle>Employee Info</CardTitle>
					<BookUser size={'1.8rem'}></BookUser>
				</CardHeader>
				<CardContent>
					<ul>
						<li>Name: John Doe</li>
						<li>Department: Utilities</li>
						<li>Role:Team Lead</li>
						<li>Overtime: Allowed</li>
						<li>Sched type: Flexi</li>
						<li>Today's Schedule: 8:00 - 15:00</li>
					</ul>
				</CardContent>
			</Card>
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
