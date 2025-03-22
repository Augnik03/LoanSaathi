    "use client";

    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

    export const DocumentExpiryTracker = () => {
    const documents = [
        { name: "Aadhaar Card", expiry: "2025-10-01" },
        { name: "PAN Card", expiry: "Lifetime" },
        { name: "Driving License", expiry: "2024-05-15" },
    ];

    return (
        <Card>
        <CardHeader>
            <CardTitle>Document Expiry Tracker</CardTitle>
            <CardDescription>Track your document expiry dates</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.expiry}</p>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    );
    };