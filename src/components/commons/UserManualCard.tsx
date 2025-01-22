import { Book } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

export default function UserManualCard() {
	{
		/* pdf thing  */
	}
	return (
		<Card className="select-none border-primary hover:cursor-pointer text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out ">
			<CardHeader className="pt-3 px-3 2xl:pt-5 2xl:px-5  pb-0 flex flex-row items-center justify-between">
				<CardTitle className="text-base lg:text-lg xl:text-2xl ">
					Employee Handbook
				</CardTitle>
				<Book></Book>
			</CardHeader>
			<CardContent className="px-3 2xl:px-5">
				<CardDescription className="text-primary">
					Click here to download
				</CardDescription>
			</CardContent>
		</Card>
	);
}
