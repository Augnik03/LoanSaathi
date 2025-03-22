"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DocumentSharing = () => {
  const handleShare = () => {
    alert("Document shared securely!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Sharing</CardTitle>
        <CardDescription>Share your documents securely</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleShare}>Share Document</Button>
      </CardContent>
    </Card>
  );
};