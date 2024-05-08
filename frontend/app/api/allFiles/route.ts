import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic'

export async function GET() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/allFiles`, {
        cache: 'no-cache',
    });
    console.log(response.status);
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const json = await response.json();

    return NextResponse.json(json);
}
