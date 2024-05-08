import {NextRequest, NextResponse} from "next/server";
import {ConditionAnalyzeResponse} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const ecd_id = url.searchParams.get('ecd_id');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/analyze?ecd_id=${ecd_id}`);

    if (!response.ok) {
        throw new Error('Failed to analyze file');
    }
    const json = await response.json();
    const result = {
        pBeforeQrsI: json.I_p_before_qrs,
        pBeforeQrsII: json.II_p_before_qrs,
        pBeforeQrsAVR: json.AVR_p_before_qrs,
        pPositiveI: json.I_p_positive,
        pPositiveII: json.II_p_positive,
        pNegativeAVR: json.AVR_p_negative,
        bpm: json.bpm,
        verdict: json.verdict
    } as ConditionAnalyzeResponse
    return NextResponse.json(result);
}
