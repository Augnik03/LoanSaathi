"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const LoanEligibilityChecker = () => {
  const [income, setIncome] = useState(50000);
  const [expenses, setExpenses] = useState(20000);

  const calculateEligibility = () => {
    const disposableIncome = income - expenses;
    return disposableIncome > 30000 ? "Eligible" : "Not Eligible";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Eligibility Checker</CardTitle>
        <CardDescription>Check if you qualify for a loan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses (₹)</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-lg font-semibold">
          Eligibility: {calculateEligibility()}
        </div>
      </CardContent>
    </Card>
  );
};