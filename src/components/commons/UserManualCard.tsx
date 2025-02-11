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
		<Card className="p-2 pt-0 2xl:p-5 select-none border-primary hover:cursor-pointer text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out ">
			<CardHeader className="p-0 flex flex-row items-end justify-between">
				<CardTitle className="text-base 2xl:text-xl ">
					Employee Handbook
				</CardTitle>
				<Book className='"2xl:w-[1.25rem] 2xl:h-[1.25rem] h-[1.5rem] w-[1.5rem]'></Book>
			</CardHeader>
			<CardContent className="p-0">
				<CardDescription className="text-primary">
					Click here to download
				</CardDescription>
			</CardContent>
		</Card>
	);
}
