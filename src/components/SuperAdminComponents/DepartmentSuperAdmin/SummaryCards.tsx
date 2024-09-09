import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SummaryCardsProps {
    totalDepartments: number;
}

export default function SummaryCards({ totalDepartments }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Departments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{totalDepartments}</p>
                </CardContent>
            </Card>
        </div>
    );
}