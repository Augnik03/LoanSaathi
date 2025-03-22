"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const RecentTransactions = () => {
  const transactions = [
    { id: 1, date: "2023-10-01", description: "Loan Disbursement", amount: "₹5,00,000" },
    { id: 2, date: "2023-10-05", description: "EMI Payment", amount: "₹10,824" },
    { id: 3, date: "2023-10-10", description: "Processing Fee", amount: "₹2,000" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your recent financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <p className="font-semibold">{transaction.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};