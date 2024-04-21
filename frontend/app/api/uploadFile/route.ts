import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/upload`, {
        method: "POST",
        body: await req.formData(),
    })
    console.log(response.status)
    if (response.status === 201) {
        const json = await response.json()
        return NextResponse.json({id: json.id},{
                status: 201,
            });
    } else {
        return NextResponse.json({},{status: 400})
    }
}
