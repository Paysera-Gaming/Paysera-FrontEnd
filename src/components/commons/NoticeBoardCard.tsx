import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function NoticeBoardCard() {
	return (
		<Card className="col-span-3 row-span-3">
			<CardHeader>
				<CardTitle>Notice Board</CardTitle>
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
