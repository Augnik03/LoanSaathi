import { NextRequest, NextResponse } from "next/server";
import Tesseract from "tesseract.js";

export async function POST(req: NextRequest) {
    try {
        const { documentUrl } = await req.json();

        const { data } = await Tesseract.recognize(documentUrl, "eng");
        const extractedText = data.text;

        return NextResponse.json({ extractedText });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
