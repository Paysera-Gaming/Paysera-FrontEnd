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
            className={`flex-1 p-4 cursor-pointer border-2 ${outlineColor} transition-transform transform hover:scale-105 ${
                active ? activeColor : ''
            } ${active ? `hover:${activeColor}` : ''}`}
        >
            <CardContent className="flex flex-col items-center">
                <div className="flex items-center">
                    <div className="text-2xl">{icon}</div>
                    <div className="ml-2 flex flex-col items-start">
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <p className="text-2xl font-bold">{count}</p>
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Fixed: {typeCounts.Fixed}</p>
                    <p>Flexible: {typeCounts.Flexible}</p>
                    <p>Super Flexible: {typeCounts['Super Flexible']}</p>
                </div>
            </CardContent>
        </Card>
    );
}