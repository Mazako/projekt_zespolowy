import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const ecd_id = url.searchParams.get('fileId');
    const signal_type = url.searchParams.get('signal_type');  // Same here

    if (!ecd_id || !signal_type) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }))
    }
    const response = await fetch(`http://localhost:8000/ecd/signal?ecd_id=${ecd_id}&signal_type=${signal_type}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const json = await response.json();
    return Response.json(json);
}
