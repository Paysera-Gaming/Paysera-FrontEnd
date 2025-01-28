    import React from "react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    
    const OvertimeTable: React.FC = () => {
      return (
        <Card className="flex-1 col-span-2 p-4">
          <CardHeader className="flex flex-row items-center justify-between relative">
            <CardTitle className="text-2xl font-semibold">Overtime Table</CardTitle>
          </CardHeader>
          <CardContent className="mt-3">
            <p className="text-base">This section will display overtime data.</p>
          </CardContent>
        </Card>
      );
    };
    
    export default OvertimeTable;