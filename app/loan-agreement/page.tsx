"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoanAgreementPage() {
  const router = useRouter();

  const handleAcceptAndProceed = () => {
    // Redirect to the dashboard with a success message
    router.push("/dashboard?success=loan_agreement_accepted");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-background/95">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Loan Agreement</h1>
        <div className="space-y-6">
          {/* Borrower Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Borrower Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">123 Main St, Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="font-medium">₹5,00,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="font-medium">10.99% p.a.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenure</p>
                <p className="font-medium">5 years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">EMI</p>
                <p className="font-medium">₹10,824/month</p>
              </div>
            </div>
          </div>

          {/* Loan Terms and Conditions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Terms and Conditions</h2>
            <p>
              By proceeding, you agree to the following terms and conditions of the loan agreement:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                The loan amount of <strong>₹5,00,000</strong> will be disbursed to your registered bank account within 2
                business days.
              </li>
              <li>
                You are required to repay the loan in <strong>60 monthly installments</strong> of <strong>₹10,824</strong> each.
              </li>
              <li>
                The interest rate of <strong>10.99% p.a.</strong> is fixed for the entire loan tenure.
              </li>
              <li>
                Failure to repay the loan on time may result in a penalty of <strong>2% per month</strong> on the overdue amount.
              </li>
              <li>
                Early repayment of the loan is allowed without any additional charges.
              </li>
              <li>
                You are responsible for ensuring that all information provided is accurate and up-to-date.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              If you have any questions, please contact our support team at <strong>support@loansaathi.com</strong> before
              proceeding.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Button onClick={handleAcceptAndProceed}>Accept and Proceed</Button>
        </div>
      </div>
    </div>
  );
}