import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function NoticeBoardCard() {
	return (
		<Card>
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
