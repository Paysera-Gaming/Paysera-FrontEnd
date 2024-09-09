import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface ViewSummaryCardsProps {
    // No props needed
}

export default function ViewSummaryCards({}: ViewSummaryCardsProps) {
    return (
        <div className="flex gap-6 mb-6">
            <Card className="flex-1 p-8 border-2 border-blue-500 transition-transform transform hover:scale-105">
                <CardContent className="flex items-center justify-between">
                    <Users size={48} className="text-blue-500" />
                    <div className="ml-4 text-right">
                        <p className="text-4xl font-bold">
                            Team Members: {/* Removed team.members.length */}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}