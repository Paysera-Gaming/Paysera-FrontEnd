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
					<CardTitle className="text-base 2xl:text-lg">Announcemnets</CardTitle>
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
		// check if data is not empty
		if (data.length != 0) {
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
						<p> {announcement.body}</p>
					</li>
				);
			});

			return (
				<Card className="p-2 pt-0 2xl:p-5 col-span-3 row-span-3">
					<CardHeader className="p-0 flex-row items-end justify-between w-full">
						<CardTitle className="text-base  2xl:text-lg ">
							Announcemnets
						</CardTitle>
						<Presentation className="2xl:w-[1.25rem] 2xl:h-[1.25rem]  h-[1.5rem] w-[1.5rem]"></Presentation>
					</CardHeader>
					<CardContent className="p-0 pt-1">
						<ScrollArea className="h-[170px] 2xl:h-[250px]">
							<ul className="list-disc list-inside text-sm 2xl:text-base">
								{AnnouncementList}
							</ul>
						</ScrollArea>
					</CardContent>
				</Card>
			);
		} else {
			return (
				<Card className="p-2 2xl:p-5 col-span-3 row-span-3">
					<CardHeader className="p-0 flex-row items-center justify-between w-full">
						<CardTitle className="text-base  2xl:text-lg ">
							Announcemnets
						</CardTitle>
						<Presentation className="2xl:w-[1.25rem] 2xl:h-[1.25rem]  h-[1.5rem] w-[1.5rem]"></Presentation>
					</CardHeader>
					<CardContent className="p-0 pt-1">
						<ScrollArea className="h-[100px] 2xl:h-[250px] text-sm 2xl:text-lg">
							No Announcements
						</ScrollArea>
					</CardContent>
				</Card>
			);
		}
	}
}
