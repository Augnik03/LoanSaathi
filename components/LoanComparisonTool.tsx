"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const LoanComparisonTool = () => {
  const loans = [
    { type: "Personal Loan", rate: "10.99%", amount: "₹5,00,000", tenure: "5 years" },
    { type: "Home Loan", rate: "8.50%", amount: "₹50,00,000", tenure: "20 years" },
    { type: "Business Loan", rate: "12.50%", amount: "₹10,00,000", tenure: "10 years" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Comparison Tool</CardTitle>
        <CardDescription>Compare different loan options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loans.map((loan, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{loan.type}</h3>
              <p>Interest Rate: {loan.rate}</p>
              <p>Loan Amount: {loan.amount}</p>
              <p>Tenure: {loan.tenure}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};