import {NextRequest, NextResponse} from "next/server";
import {resolveRelativeUrl} from "next/dist/lib/metadata/resolvers/resolve-url";
export const dynamic = 'force-dynamic'

export async function POST(nextRequest: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/addP`, {
        method: 'POST',
        cache: 'no-cache',
        body: nextRequest.body,
        duplex: 'half'
    });


    return NextResponse.json(await response.json(), {status: response.status});
}
