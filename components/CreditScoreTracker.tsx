"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const CreditScoreTracker = () => {
  const [creditScore, setCreditScore] = useState(750);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score Tracker</CardTitle>
        <CardDescription>Monitor your credit health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold">{creditScore}</div>
          <Progress value={creditScore / 10} className="h-2 mt-4" />
          <p className="text-sm text-muted-foreground mt-2">Updated: October 2023</p>
        </div>
      </CardContent>
    </Card>
  );
};