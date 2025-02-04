import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function RequestOverTimeButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-violet-500 hover:bg-violet-500">
					Request Overtime
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Requesting of overtime form</DialogTitle>
					<DialogDescription>
						Select the amount of hours to render for your request. Click submit
						when you're done.
					</DialogDescription>
				</DialogHeader>

				<Label htmlFor="name" className="">
					How many hours to render
				</Label>

				<div className="flex gap-2">
					<Select>
						<SelectTrigger className="w-[280px]">
							<SelectValue placeholder="Select hours to render on overtime" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Available hours</SelectLabel>
								<SelectItem value="1">1</SelectItem>
								<SelectItem value="2">2</SelectItem>
								<SelectItem value="3">3</SelectItem>
								<SelectItem value="4">4</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
