import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface SummaryCardProps {
    title: string;
    count: number;
    typeCounts: { Fixed: number; Flexible: number; 'Super Flexible': number };
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
    outlineColor: string; // New prop for outline color
}

export function SummaryCard({ title, count, typeCounts, icon, active, onClick, outlineColor }: SummaryCardProps) {
    return (
        <Card
            onClick={onClick}
            className={`flex-1 p-4 cursor-pointer bg-transparent border-2 ${outlineColor} ${active ? 'bg-blue-100 dark:bg-gray-800' : ''}`}
        >
            <CardContent className="flex flex-col items-center">
                <div className="flex items-center">
                    {icon}
                    <div className="ml-3 flex flex-col items-start">
                        <CardTitle className="text-base">{title}</CardTitle>
                        <p className="text-xl font-semibold">{count}</p>
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