import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, ChevronRight } from 'lucide-react';

export default function AnnouncementCard() {
    return (
        <Card className="w-full col-span-3 p-4">
            <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
                <div className="flex items-center space-x-2">
                    <Megaphone size={'1.8rem'} className="text-primary" />
                    <CardTitle className="text-2xl font-bold">Welcome to Paysera</CardTitle>
                </div>
                <Button variant="outline" className="p-2 text-sm">
                    Learn More <ChevronRight size={16} className="ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-lg text-gray-700">
                    Experience seamless financial services with Paysera. We're here to make your banking easier, faster, and more secure.
                </p>
            </CardContent>
        </Card>
    );
}

