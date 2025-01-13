import { Presentation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { getAnnouncements } from '@/api/CommonsAPI';
import { useQuery } from '@tanstack/react-query';

export default function NoticeBoardCard() {
	// fetch the holidays here
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['AnnouncementQuery'],
		queryFn: getAnnouncements,
	});

	if (isSuccess) {
		console.log(data);
		const AnnouncementList = data.map((announcement) => {
			const day = new Date(announcement.createdAt).getDate();
			const month = new Date(announcement.createdAt).getMonth() + 1;

			return (
				<li>
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
			<Card className="col-span-3 row-span-3">
				<CardHeader className="flex-row items-center justify-between w-full">
					<CardTitle>Announcemnets</CardTitle>
					<Presentation></Presentation>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[250px]">
						<ul className="list-disc list-inside">{AnnouncementList}</ul>
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}
}
