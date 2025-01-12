import { Presentation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function NoticeBoardCard() {
	return (
		<Card className="col-span-3 row-span-3">
			<CardHeader className="flex-row items-center justify-between w-full">
				<CardTitle>Notice Board</CardTitle>
				<Presentation></Presentation>
			</CardHeader>
			<CardContent>
				<ul>
					<li>01/25 - Hello Everyone!</li>
					<li>02/05 - Hello Everyone time for paypay!</li>
				</ul>
			</CardContent>
		</Card>
	);
}
