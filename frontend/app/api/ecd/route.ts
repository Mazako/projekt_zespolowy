
export async function GET() {
    const results = await fetch("http://localhost:8000/ecd/signal?ecd_id=66159a8ebe6535a3f9a5f024&signal_type=I");
    const json = await results.json();
    return Response.json(json);
}
