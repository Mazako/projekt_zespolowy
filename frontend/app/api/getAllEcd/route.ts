export async function GET(){
    const response = await fetch('http://localhost:8000/ecd/allFiles', {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const json = await response.json();
    return Response.json(json);
}
