import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic'

export async function GET() {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/prune`, {cache: 'no-cache'});
    return NextResponse.json({}, {status: 200})
}

