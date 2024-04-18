export async function GET() {
    console.log(process.env.BACKEND_URL)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ecd/allFiles`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const json = await response.json();
    return Response.json(json);
}
