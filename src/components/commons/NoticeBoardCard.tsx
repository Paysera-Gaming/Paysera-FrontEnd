import { Presentation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { getAnnouncements } from '@/api/CommonsAPI';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';

export default function NoticeBoardCard() {
	// fetch the holidays here
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['AnnouncementQuery'],
		queryFn: getAnnouncements,
	});

	if (isLoading) {
		return <Skeleton className="col-span-3 row-span-3"></Skeleton>;
	}

	if (isError) {
		return (
			<Card className="col-span-3 row-span-3">
				<CardHeader className="flex-row items-center justify-between w-full">
					<CardTitle>Announcemnets</CardTitle>
					<Presentation></Presentation>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[250px]">
						There seems to be an error loading the announcements
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}

	if (isSuccess) {
		console.log(data);
		// check if data is not empty

		if (data.length != 0) {
			const AnnouncementList = data.map((announcement) => {
				const day = new Date(announcement.createdAt).getDate();
				const month = new Date(announcement.createdAt).getMonth() + 1;

				return (
					<ul className="list-disc list-inside">
						<li>
							<p className="font-bold inline">
								{month > 10 ? month : `${0}` + month}
								{'/' + day} - {announcement.title}
							</p>
							<br />
							<p> {announcement.body}</p>
						</li>
					</ul>
				);
			});

			return (
				<Card className="col-span-3 row-span-3">
					<CardHeader className="flex-row items-center justify-between w-full">
						<CardTitle>Announcemnets</CardTitle>
						<Presentation></Presentation>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[250px]">{AnnouncementList}</ScrollArea>
					</CardContent>
				</Card>
			);
		} else {
			return (
				<Card className="col-span-3 row-span-3">
					<CardHeader className="flex-row items-center justify-between w-full">
						<CardTitle>Announcemnets</CardTitle>
						<Presentation></Presentation>
					</CardHeader>
					<CardContent>No announcements yet.</CardContent>
				</Card>
			);
		}
	}
}
