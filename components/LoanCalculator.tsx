"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.99);
  const [loanTenure, setLoanTenure] = useState(12);

  const calculateEMI = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTenure)) /
      (Math.pow(1 + monthlyInterestRate, loanTenure) - 1);
    return emi.toFixed(2);
  };

  return (
    <Card className="border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-600">Loan Calculator</CardTitle>
        <CardDescription>Estimate your monthly EMI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Amount Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-purple-600">
            Loan Amount (₹)
          </label>
          <Input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter loan amount"
          />
        </div>

        {/* Interest Rate Slider */}
        <div>
          <label className="block text-sm font-medium mb-2 text-purple-600">
            Interest Rate (%)
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <span className="text-sm text-purple-600">{interestRate}%</span>
        </div>

        {/* Loan Tenure Slider */}
        <div>
          <label className="block text-sm font-medium mb-2 text-purple-600">
            Loan Tenure (Months)
          </label>
          <input
            type="range"
            min="6"
            max="60"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <span className="text-sm text-purple-600">{loanTenure} Months</span>
        </div>

        {/* EMI Result */}
        <div className="text-center">
          <p className="text-lg font-semibold text-purple-600">
            Estimated EMI: ₹{calculateEMI()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};