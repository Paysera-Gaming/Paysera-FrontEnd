import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Utensils, Users, UserCheck } from 'lucide-react';
import { useState } from 'react';

type CardData = {
	title: string;
	population: number;
	icon: React.ReactNode;
	description: string;
};

export default function EmployeesStatusCards() {
	const [cardData, setCardData] = useState<CardData[]>([
		{
			title: 'Total Employees',
			population: 20,
			icon: <Users></Users>,
			description: 'Total Employees on this department',
		},
		{
			title: 'Online Employees',
			population: 9,
			icon: <UserCheck></UserCheck>,
			description: 'Total employees that are online',
		},
		{
			title: 'On Lunch',
			population: 5,
			icon: <Utensils></Utensils>,
			description: 'Employees that are on a lunch break',
		},
	]);

	const CardItems = cardData.map((card, index) => {
		return (
			<Card className="flex-1 p-4" key={index}>
				<CardContent className="flex item-cineter justify-between p-0 pb-2">
					<p className="text-lg">{card.title}:</p>
					{card.icon}
				</CardContent>
				<CardHeader className="p-0">
					<CardTitle>{card.population}</CardTitle>
					<CardDescription className="text-base">
						{card.description}
					</CardDescription>
				</CardHeader>
			</Card>
		);
	});

	return <>{CardItems}</>;
}
