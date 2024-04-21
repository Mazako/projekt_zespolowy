import {NextResponse} from "next/server";

export async function GET() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/size`, {
        cache: "no-cache",
    });
    return NextResponse.json(await response.json());
}
