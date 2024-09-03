import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface SummaryCardProps {
    title: string;
    count: number;
    typeCounts: { Fixed: number; Flexible: number; 'Super Flexible': number };
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
    outlineColor: string; // New prop for outline color
    activeColor: string; // New prop for active color
}

export function SummaryCard({ title, count, typeCounts, icon, active, onClick, outlineColor, activeColor }: SummaryCardProps) {
    return (
        <Card
            onClick={onClick}
            className={`flex-1 p-6 cursor-pointer border-2 ${outlineColor} transition-transform transform hover:scale-105 ${
                active ? activeColor : ''
            } ${active ? `hover:${activeColor}` : ''}`}
            style={{ maxWidth: '300px' }} // Adjust the max-width of the card
        >
            <CardContent className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="text-3xl">{icon}</div>
                    <div className="ml-4 text-right">
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <p className="text-3xl font-bold">{count}</p>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 w-full">
                    <p>Fixed: {typeCounts.Fixed}</p>
                    <p>Flexible: {typeCounts.Flexible}</p>
                    <p>Super Flex: {typeCounts['Super Flexible']}</p> {/* Shortened text */}
                </div>
            </CardContent>
        </Card>
    );
}