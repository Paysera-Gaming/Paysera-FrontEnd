import { requestOvertime } from '@/api/OvertimeAPI';
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
import { useUserStore } from '@/stores/userStore.ts';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// get
// get attendance today
// get attendance that requests overtime
// team lead can edit the requested overtime hours
// after that approve or reject`
// teamlead can descerne if the request is rejected or not

export function RequestOverTimeButton() {
	const [getHours, setHours] = useState<number>(0);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const employeeAllowedToOvertime =
		useUserStore.getState().user?.isAllowedRequestOvertime;

	function handleSubmit() {
		setIsLoading(true);
		// check if user is valid for said overtime
		if (!employeeAllowedToOvertime) {
			toast.warning('You are not permitted to have an overtime');
			console.log(employeeAllowedToOvertime);
			setIsLoading(false);
			setIsOpen(false);
			return;
		} else {
			mutation.mutate();
		}
	}

	const employeeId = useUserStore.getState().user?.id;

	const mutation = useMutation({
		mutationFn: () => {
			console.log(employeeId);

			if (employeeId === undefined) {
				throw new Error('Employee ID is undefined');
			}
			return requestOvertime({
				employeeId: employeeId,
				timeStamp: new Date(),
				limitOvertime: getHours,
			});
		},
		onSuccess: () => {
			toast.success('Request for overtime has successfully submitted');
		},
		onSettled: () => {
			setIsLoading(false);
			setIsOpen(false);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-violet-500 hover:bg-violet-500 text-base">
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
					<Select onValueChange={(value) => setHours(Number(value))}>
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
								<SelectItem value="5">5</SelectItem>
								<SelectItem value="6">6</SelectItem>
								<SelectItem value="7">7</SelectItem>
								<SelectItem value="8">8</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<DialogFooter>
						<Button
							onClick={handleSubmit}
							disabled={getHours == 0 || isLoading}
							type="submit"
						>
							<Loader2
								className={cn(
									isLoading == false && 'hidden',
									'animate-spin mr-1'
								)}
							/>
							Submit
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
