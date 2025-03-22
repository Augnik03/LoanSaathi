import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { income, employmentType, creditScore } = await req.json();

        // Define eligibility rules
        let decision = "Rejected";
        let reason = "Insufficient credit score or income";

        if (creditScore >= 700 && income >= 50000) {
            decision = "Approved";
            reason = "Meets minimum income and credit requirements";
        } else if (creditScore >= 650 && income >= 30000) {
            decision = "More Info Needed";
            reason = "Please provide additional income proof";
        }

        return NextResponse.json({ decision, reason });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
