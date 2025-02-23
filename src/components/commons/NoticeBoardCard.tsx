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
		return <Skeleton className=""></Skeleton>;
	}

	if (isError) {
		return (
			<Card className="">
				<CardHeader className="flex-row items-center justify-between w-full">
					<CardTitle className="text-base 2xl:text-lg">Announcemnets</CardTitle>
					<Presentation></Presentation>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[250px]">
						There seems to be an error loading the announcements.
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}

	if (isSuccess) {
		// Ensure that data is a valid array
		if (!Array.isArray(data)) {
			return (
				<Card className="h-full">
					<CardHeader className="flex-row items-center justify-between w-full">
						<CardTitle className="">Announcements</CardTitle>
						<Presentation></Presentation>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[250px]">
							There was an issue with the server.
						</ScrollArea>
					</CardContent>
				</Card>
			);
		}

		// If there are no announcements
		if (data.length === 0) {
			return (
				<Card className="p-2 2xl:p-5">
					<CardHeader className="p-0 flex-row items-center justify-between w-full">
						<CardTitle className="">Announcements</CardTitle>
						<Presentation className="" />
					</CardHeader>
					<CardContent className="p-0 pt-1">
						<ScrollArea className="h-[100px] 2xl:h-[250px] ">
							No Announcements
						</ScrollArea>
					</CardContent>
				</Card>
			);
		}

		// If there are announcements, render them
		const AnnouncementList = data.map((announcement, index) => {
			const day = new Date(announcement.createdAt).getDate();
			const month = new Date(announcement.createdAt).getMonth() + 1;

			return (
				<li key={index}>
					<p className="font-bold inline">
						{month > 10 ? month : `${0}` + month}
						{'/' + day} - {announcement.title}
					</p>
					<br />
					<p>{announcement.body}</p>
				</li>
			);
		});

		return (
			<Card className="">
				<CardHeader className="flex-row items-end justify-between w-full">
					<CardTitle>Announcemnets</CardTitle>
					<Presentation />
				</CardHeader>
				<CardContent className="">
					<ScrollArea className="h-[170px] 2xl:h-[250px]">
						<ul className="list-disc list-inside text-sm 2xl:text-base">
							{AnnouncementList}
						</ul>
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}
}
